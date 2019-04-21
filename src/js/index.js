import '../style/index'
import { a } from './a'
import { b } from './b'
import './c'
import _ from 'lodash'
console.log(a)
console.log('webpack worked')
async function test() {
  const num = await 6
  console.log(num)
}
test()
var users = [{name:"zhangsan",age:18},{name:"jack",age:20}]

var getUser = users.find(function(finder){
  return finder.name = "jack"
});
console.log(getUser)
console.log(_.join(['hello', 'webpack4']))