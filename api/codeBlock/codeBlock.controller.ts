import { Request, Response } from 'express'
import { codeBlocksService } from './codeBlock.service'
import { ObjectId } from 'mongodb'

export interface CodeBlock {
  _id: ObjectId
  title: string
  initialTemplate: string
  solution: string
  visitorCounter: number
  value: string
}

export const getCodeBlocks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const codeBlocks: CodeBlock[] = await codeBlocksService.query()
    res.json(codeBlocks)
  } catch (err) {
    console.error('Error fetching code blocks:', err)
    res.status(500).send('Cannot get code blocks')
  }
}

export const getCodeBlock = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { codeBlockId } = req.params
    const codeBlock: CodeBlock | null = await codeBlocksService.getById(
      codeBlockId
    )
    res.json(codeBlock)
  } catch (err) {
    console.error('Cannot get codeBlock', err)
    res.status(500).send('Cannot get codeBlock')
  }
}

export const updateCodeBlock = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const codeBlock: CodeBlock = req.body

    if (
      !codeBlock._id ||
      !codeBlock.title ||
      !codeBlock.initialTemplate ||
      typeof codeBlock.visitorCounter !== 'number'
    ) {
      res.status(400).send('Invalid code block data')
      return
    }

    const updatedCodeBlock = await codeBlocksService.update(codeBlock)
    res.json(updatedCodeBlock)
  } catch (err) {
    console.error('Error updating code block:', err)
    res.status(500).send('Failed to update code block')
  }
}
