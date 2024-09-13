import { Collection, ObjectId } from 'mongodb'
import { dbService } from '../../src/services/db.service'
import { CodeBlock } from './codeBlock.controller'

async function query(): Promise<CodeBlock[]> {
  try {
    const collection: Collection = await dbService.getCollection('codeBlocks')
    const codeBlocks: any[] = await collection.find().toArray() // Use find() to ensure proper query
    return codeBlocks
  } catch (err) {
    throw new Error(`Failed to query code blocks: ${err}`)
  }
}

async function getById(codeBlockId: string): Promise<CodeBlock> {
  try {
    const collection = await dbService.getCollection('codeBlocks')
    const codeBlock = await collection.findOne({
      _id: new ObjectId(codeBlockId),
    })
    return codeBlock as CodeBlock
  } catch (err) {
    console.error(`while finding toy ${codeBlockId}`, err)
    throw err
  }
}

async function update(codeBlock: CodeBlock): Promise<CodeBlock> {
  try {
    const codeBlockToSave: Partial<CodeBlock> = {
      initialTemplate: codeBlock.initialTemplate,
      title: codeBlock.title,
      visitorCounter: codeBlock.visitorCounter,
      solution: codeBlock.solution,
      value: codeBlock.value,
    }
    const collection = await dbService.getCollection('codeBlocks')
    await collection.updateOne(
      { _id: new ObjectId(codeBlock._id) },
      { $set: codeBlockToSave }
    )
    return codeBlock
  } catch (err) {
    console.error(`cannot update toy ${codeBlock._id}`, err)
    throw err
  }
}

export const codeBlocksService = {
  query,
  getById,
  update,
}
