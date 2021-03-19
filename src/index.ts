const chalk = require('chalk')
import 'reflect-metadata'
import { createConnection, getRepository } from 'typeorm'
import { User } from './entity/User'
import { Photo } from './entity/Photo'

createConnection()
  .then(async (connection) => {
    console.log(chalk.green('数据库链接成功成功'))

    // User 操作
    console.log('Inserting a new user into the database...')
    const user = new User()
    user.firstName = 'Timber'
    user.lastName = 'Saw'
    user.age = 25
    await connection.manager.save(user)
    console.log('Saved a new user with id: ' + user.id)

    console.log('Loading users from the database...')
    const users = await connection.manager.find(User)
    console.log('Loaded users: ', users)
    return connection
  })
  .then(async (connection) => {
    // photo 操作
    let photo = new Photo()
    photo.name = 'Me and Bears'
    photo.description = 'I am near polar bears'
    photo.filename = 'photo-with-bears.jpg'
    photo.views = 1
    photo.isPublished = true
    const res = await connection.manager.save(photo)
    console.log(chalk.green('添加成功', res))

    if (res) {
      console.log(chalk.green('Photo has been saved. Photo id is'), photo.id)
    }
    return connection
  })
  .then(async (connection) => {
    // 获取 Photo Repository
    const photoRepository = getRepository(Photo)

    // 获取全部内容
    let allPhotos = await photoRepository.find()
    console.log(chalk.green('All photos from the db: '), allPhotos)

    let firstPhoto = await photoRepository.findOne(1)
    console.log('First photo from the db: ', firstPhoto)

    let meAndBearsPhoto = await photoRepository.findOne({
      name: 'Me and Bears',
    })
    console.log('Me and Bears photo from the db: ', meAndBearsPhoto)

    let allViewedPhotos = await photoRepository.find({ views: 1 })
    console.log('All viewed photos: ', allViewedPhotos)

    let allPublishedPhotos = await photoRepository.find({ isPublished: true })
    console.log('All published photos: ', allPublishedPhotos)

    let [alPhotos, photosCount] = await photoRepository.findAndCount()
    console.log('All photos: ', alPhotos)
    console.log('Photos count: ', photosCount)
    
  })
  .catch((error) => console.log(chalk.red('err', error)))
