import express from 'express'
import {
  getCodeBlock,
  getCodeBlocks,
  updateCodeBlock,
} from './codeBlock.controller'

export const codeBlockRoutes = express.Router()

codeBlockRoutes.get('/', getCodeBlocks)
codeBlockRoutes.get('/:codeBlockId', getCodeBlock)
codeBlockRoutes.put('/', updateCodeBlock)
