import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentService } from '../services/CommentService'

export class CommentController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      // .get('/:commentId', this.getOne)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await commentService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  // ANCHOR why is it req.query
  async getAll(req, res, next) {
    try {
      return res.send(await commentService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      return res.send(await commentService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  // async getOne(req, res, next) {
  //   try {
  //     res.send(await commentService.getOne(req.params.commentId))
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async edit(req, res, next) {
    try {
      res.send(await commentService.edit(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }
}
