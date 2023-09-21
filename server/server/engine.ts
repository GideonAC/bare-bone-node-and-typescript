import fs from 'fs';
import path, { dirname }  from 'path'
import http, { IncomingMessage, Server, ServerResponse } from 'http';
import { info } from 'console';



interface Organizations {
    organization: string;
    createdAt: string;
    updatedAt: string;
    products: string[];
    marketValue: string;
    address: string;
    ceo: string;
    country: string;
    id: number;
    noOfEmployees:number;
    employees: string[];
  }


  //-------------POST-----------

  export const createData = (req:IncomingMessage, res: ServerResponse) => {
       let datas = "";
       
       req.on("data", (chunk)=>{
        datas += chunk;
       })
       req.on("end", ()=>{
      
        console.log(datas)
        let work = JSON.parse(datas)
        console.log('work     ',work)
        let databasefolder = path.join(__dirname, "database")
        let datafile = path.join(databasefolder, "database.json")

        //create database dynamically
        if(!fs.existsSync(databasefolder)){
          fs.mkdirSync(databasefolder)
        }
        if(!fs.existsSync(datafile)){
          fs.writeFileSync(datafile, "")
        } 
        return fs.readFile(path.join(__dirname, "database/database.json"), "utf-8", (err, info)=>{
              if(err){
                res.writeHead(500, {"content-Type": "application/json"});
                res.end(JSON.stringify({
                 success: false,
                 error: err

                }))
              }else {
                let organization: Organizations[] = []
                   console.log('organization     ',organization) 
                try{
                  organization = JSON.parse(info)
                }catch(parseError){
                  organization = []
                }  
                console.log('organization     ',organization) 

                work.createdAt = new Date();
                work.noOfEmployees = work.employees.length;
                if(organization.length === 0){
                  work.id = 1
                }else{
                  let ids =organization.map((a=>a.id))
                  let newId = Math.max(...ids)
                  work.id = newId + 1
                }
                organization.push(work)

                //update data

//  let putData = organization.findIndex((a)=>a.id = work.id)
//  organization[fetchedData] = work

      


                //write back into database
                fs.writeFile(path.join(__dirname, "database/database.json"), JSON.stringify(organization, null, 2), (err)=>{
                 if(err){
                  res.writeHead(500, {"content-Type": "application/json"});
                  res.end(JSON.stringify({
                    success: false,
                    error: err
                  }))   
                  
                 }else{
                  res.writeHead(200, {"content-Type": "application/json"});
                  res.end(
                    JSON.stringify({
                      success: true,
                      message: work
                    })
                  )
                 }
               })
            }
      })    
        }
       )}


   //--------GET ALL DATA---------
   export const fetchedData = (req: IncomingMessage, res: ServerResponse)=>{
    //read data from database

    return fs.readFile(path.join(__dirname, "database/database.json"), "utf-8", (err, data)=>{
          if(err){
            console.log(err)
            res.writeHead(500, {"content-Type":"application/json"});
            res.end(JSON.stringify({
              success: false,
              error: err
            }))
          }else{
            console.log(data)
            data = JSON.parse(data);
            res.writeHead(200, {"content-Type":"application/json"});
            res.end(JSON.stringify(data, null, 2))
          }
    })
   }
      



   //------UPDATE DATA-------

   export const putData = (req: IncomingMessage, res: ServerResponse)=>{
            
            let datas = "";

            req.on("data", (chunk)=>{
              datas += chunk;
             })
             req.on("end", ()=>{
              
              let work = JSON.parse(datas)
              let databasefolder = path.join(__dirname, "database")
              let datafile = path.join(databasefolder, "database.json")
      
              //create database dynamically
              if(!fs.existsSync(databasefolder)){
                fs.mkdirSync(databasefolder)
              }
              if(!fs.existsSync(datafile)){
                fs.writeFileSync(datafile, "")
              } 
              return fs.readFile(path.join(__dirname, "database/database.json"), "utf-8", (err, info)=>{
                    if(err){
                      res.writeHead(500, {"content-Type": "application/json"});
                      res.end(JSON.stringify({
                       success: false,
                       error: err
      
                      }))
                    }else {
                      let organization: Organizations[] = []
                        
                      try{
                        organization = JSON.parse(info)
                      }catch(parseError){
                        organization = []
                      }
                      const putData = organization.findIndex((a)=>a.id === work.id)
                      if(putData === -1){
                        res.end("No existing data")
                      }
                      organization [putData] = work
                      console.log(putData)
                      //write back into database
                      fs.writeFile(path.join(__dirname, "database/database.json"), JSON.stringify(organization, null, 2), (err)=>{
                        if(err){
                         res.writeHead(500, {"content-Type": "application/json"});
                         res.end(JSON.stringify({
                           success: false,
                           error: err
                         }))   
                         
                        }else{
                         res.writeHead(200, {"content-Type": "application/json"});
                         res.end(
                           JSON.stringify({
                             success: true,
                             message: work
                           })
                      )}
                        })
                    } 

                    
                })
              })}

              //--------DELETE DATA------
              export const deleteData = (req: IncomingMessage, res: ServerResponse)=>{
                let datas = "";

                req.on("data", (chunk)=>{
                  datas += chunk;
                 })
                 req.on("end", ()=>{
              
                  let work = JSON.parse(datas)
                  let databasefolder = path.join(__dirname, "database")
                  let datafile = path.join(databasefolder, "database.json")
          
                  //create database dynamically 
                  if(!fs.existsSync(databasefolder)){
                    fs.mkdirSync(databasefolder)
                  }
                  if(!fs.existsSync(datafile)){
                    fs.writeFileSync(datafile, "")
                  } 
                  return fs.readFile(path.join(__dirname, "database/database.json"), "utf-8", (err, info)=>{
                    if(err){
                      res.writeHead(500, {"content-Type": "application/json"});
                      res.end(JSON.stringify({
                       success: false,
                       error: err
      
                      }))
                    }else {
                      let organization: Organizations[] = []
                        
                      try{
                        organization = JSON.parse(info)
                      }catch(parseError){
                        organization = []
                      }
                    const deleteData = organization.findIndex((a)=>a.id === work.id)
                    if(deleteData === -1){
                      res.end("No existing data")
                    }
                    organization.splice(deleteData, 1)


                    //write back into database
                    fs.writeFile(path.join(__dirname, "database/database.json"), JSON.stringify(organization, null, 2), (err)=>{
                      if(err){
                       res.writeHead(500, {"content-Type": "application/json"});
                       res.end(JSON.stringify({
                         success: false,
                         error: err
                       }))   
                       
                      }else{
                       res.writeHead(200, {"content-Type": "application/json"});
                       res.end(
                         JSON.stringify({
                           success: true,
                           message: organization
                         })   
                    )}
                  })
                  }})
                })}
              