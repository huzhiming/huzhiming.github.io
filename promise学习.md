##### 宏任务与微任务执行顺序

    (async()=>{
      var promise1 = new Promise(function (resolve) {
        console.log('promise1')
        resolve(resolve)
        console.log('promise1 end')
      })
      // await promise1.then(function (resolve) {
      promise1.then(function (resolve) {
        console.log('promise2')
        resolve(resolve)
        console.log('promise3')
      })
    
      setTimeout(function(){
      	console.log('settimeout')
      })
      console.log('script end')
    })()
    
    // promise1.then不加await，执行结果
    promise1
    promise1 end
    script end
    promise2
    promise3
    settimeout
    // promise1.then加await，执行结果
    promise1
    promise1 end
    promise2
    promise3
    script end
    settimeout


    

