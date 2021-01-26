import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listService } from '../services/ListService'
import { taskService } from '../services/TaskService'

export class ListController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      // .get(':listId', this.getOne)
      .get('/:id/tasks', this.getTasks)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await listService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  // ANCHOR why is it req.query
  async getAll(req, res, next) {
    try {
      return res.send(await listService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      return res.send(await listService.delete(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  // async getOne(req, res, next) {
  //   try {
  //     res.send(await listService.getOne(req.params.listId))
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async edit(req, res, next) {
    try {
      res.send(await listService.edit(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async getTasks(req, res, next) {
    try {
      const data = await taskService.getTasks({ list: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
