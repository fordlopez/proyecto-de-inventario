const logger = (request,response,next)=>{
   console.log(`metodos : ${request.method}`)
   console.log(`url : ${request.url}`)

    next()
}

export{logger}