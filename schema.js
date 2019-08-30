const graphql = require('graphql');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLSchema,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name : 'User',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        email: { type: GraphQLString},
        friends: {
            type: new GraphQLList(UserType),
            resolve(parentValue,args){
                return User.findById(parentValue._id).populate('friends').then(user => user.friends);
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: {type: GraphQLID }},
            resolve(parentValue, args){
                return User.findById(args.id).then(user => user)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue,{name}){
                const user = new User({name});
                return user.save().then(user => user);
            }
        },
        addFriend: {
            type: UserType,
            args: {
              id: { type: new GraphQLNonNull(GraphQLID) },
              friend: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, { id ,friend}) {
              return User.findById(id).then(user =>{
                user.friends.push(friend);
                return user.save()
                .then(user => user);
              })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
  });