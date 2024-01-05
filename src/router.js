import { readdir } from 'node:fs/promises'
import * as path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = new Map()
const baseDir = path.join(__dirname, '/routes')

async function loadRoutesDir (dirName = '', base = path.sep) {
  const relativePath = path.join(base, dirName)
  const workDir = path.join(baseDir, relativePath)

  try {
    const dir = await readdir(workDir, { withFileTypes: true })

    for await (const dirent of dir) {
      if (dirent.isDirectory()) {
        await loadRoutesDir(dirent.name, path.join(base, dirName))
      } else if (dirent.isFile() && path.extname(dirent.name) === '.js' && path.basename(dirent.name, '.js') === 'index') {
        const modulePath = pathToFileURL(path.join(workDir, dirent.name))
        const module = await import(modulePath)
        router.set(relativePath.replaceAll(path.sep, '/'), { ...module })
      }
    }
  } catch (error) {
    console.error(`Error loading routes in directory ${relativePath}:`, error)
  }
}

export { router, loadRoutesDir }
