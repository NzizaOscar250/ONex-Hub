import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"
import { typeDefs } from "./schema.js"
import db from "./_db.js"


const resolvers= {
    Query:{
        games(){
            return db.games;
        },
        reviews(){
            return db.reviews;
        },
        review(_,args){
            return db.reviews.find((item)=>item.id === args.id) 
        },
        authors(){
            return db.authors;
        }
    }
}

const server = new ApolloServer({
typeDefs,
resolvers
})


const {url} = await startStandaloneServer(server,{
    listen: {port:4000}
})

console.log(`Server started at port`,4000)
