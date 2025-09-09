const fs = require("fs")
const path = require("path")

function fixPaths(dir) {
  try {
    const files = fs.readdirSync(dir)

    files.forEach((file) => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        fixPaths(filePath)
      } else if (file.endsWith(".html") || file.endsWith(".css") || file.endsWith(".js")) {
        try {
          let content = fs.readFileSync(filePath, "utf8")

          // For custom domains, we want absolute paths starting with /
          // Fix _next/static paths to /static
          content = content.replace(/_next\/static/g, "/static")

          // Ensure all internal links start with /
          content = content.replace(/href="(?!http|\/|#)/g, 'href="/')
          content = content.replace(/src="(?!http|\/|data:)/g, 'src="/')

          // Fix CSS url() references
          content = content.replace(/url$$(?!http|\/|data:)([^)]+)$$/g, "url(/$1)")

          fs.writeFileSync(filePath, content)
        } catch (error) {
          console.warn(`Warning: Could not process file ${filePath}:`, error.message)
        }
      }
    })
  } catch (error) {
    console.warn(`Warning: Could not process directory ${dir}:`, error.message)
  }
}

// Main execution
try {
  const outDir = path.join(process.cwd(), "out")

  if (!fs.existsSync(outDir)) {
    console.error("❌ Out directory not found. Make sure the build completed successfully.")
    process.exit(1)
  }

  // Move _next/static to static
  const nextStaticDir = path.join(outDir, "_next", "static")
  const staticDir = path.join(outDir, "static")

  if (fs.existsSync(nextStaticDir)) {
    console.log("📁 Moving _next/static to static...")

    // Remove existing static directory if it exists
    if (fs.existsSync(staticDir)) {
      fs.rmSync(staticDir, { recursive: true, force: true })
    }

    // Move the directory
    fs.renameSync(nextStaticDir, staticDir)

    // Remove _next directory if it's empty
    const nextDir = path.join(outDir, "_next")
    if (fs.existsSync(nextDir)) {
      const remainingFiles = fs.readdirSync(nextDir)
      if (remainingFiles.length === 0) {
        fs.rmSync(nextDir, { recursive: true, force: true })
      }
    }

    console.log("✅ Moved _next/static to static")
  } else {
    console.log("ℹ️  No _next/static directory found")
  }

  // Fix paths in all files
  console.log("🔧 Fixing asset paths for custom domain...")
  fixPaths(outDir)

  console.log("✅ Successfully fixed all asset paths for custom domain!")
  console.log("🚀 Your site is ready for deployment on custom domain!")
} catch (error) {
  console.error("❌ Error during path fixing:", error.message)
  process.exit(1)
}
