const graphql = require('graphql');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLInt
} = graphql;

const AuthData = new GraphQLObjectType({
    name: 'Auth',
    fields: () => ({
        id: { type: GraphQLID},
        token: { type: GraphQLString},
        tokenExpiration: { type: GraphQLInt}
    })
})

const UserType = new GraphQLObjectType({
    name : 'User',
    fields: () => ({
        id: { type: GraphQLID},
        firstName: { type: GraphQLString},
        lastName: { type: GraphQLString},
        email: { type: GraphQLString},
        password: {type: GraphQLString},
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
        },
        login: {
            type: AuthData,
            args: { 
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue,{email,password}){
                return User.findOne({email})
                .then(user => {
                    if (!user){
                        throw new Error('User does not exist!');
                    }
                    return bcrypt.compare(password,user.password).then(isEqual =>{
                        if (!isEqual){
                            throw new Error('Incorrect password!')
                        }
                        const token = jwt.sign({
                            id:user._id,email:user.email,firstName:user.firstName,lastName:user.lastName},'(:SomeSecret:)',{
                            expiresIn: '1h'
                        });
                        return {id:user.id,token,tokenExpiration: 1}
                    })
                }).catch(err => err)
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
                email: {type: new GraphQLNonNull(GraphQLString)},
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue,{email,firstName,lastName,password}){
                return User.findOne({email})
                .then(user =>{
                    if (user){
                        throw new Error('User already exists!')
                    }
                    return bcrypt.hash(password,12)
                })
                .then( hashedPassword =>{
                    const user = new User({email,firstName,lastName,password:hashedPassword});
                    return user.save();
                }).then(user => user)
                .catch(error =>{
                    throw error
                });
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