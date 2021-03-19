import createConnection from '../utils/connection'

import { Photo } from '../entity/Photo'

createConnection().then(async (connection) => {
  const photoRepository = await connection.getRepository(Photo)

  // 找到仓库的所有行
  const allPhotos = await photoRepository.find()

  const start = allPhotos.length
  console.log('开始时 photo 数据表的条数：',  start)

  // 创建 photo对象
  let curPhoto = new Photo()
  const res = await photoRepository.save(
    Object.assign(curPhoto, {
      name: '美女',
      description: '美女图',
      filename: 'xxx.png',
      views: 12,
      isPublished: true,
    })
  )
  console.log('插入结果', res)

  // 按 name找到 某个 photo对象
  const finded = await photoRepository.find({ name: '美女' })
  console.log('找到插入的数据：', finded, finded.length)

  finded.name = 'xxxx'

  const updated = await photoRepository.save(finded)
  console.log('更新找到的数据', updated)

  const removed = await photoRepository.remove(updated)
  console.log('删除更新后的数据:', removed)

	console.log('最后 photo 表的数据条数' , (await photoRepository.find()).length)
	
})
