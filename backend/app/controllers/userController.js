const User = require('../models/userModel');

exports.register = async (req, res, next) => {
    try { 
        const UserBody = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        console.log(UserBody)
        const user = new User(UserBody)
        const saveUser = await user.save();

        const userInfo = {
            id: saveUser.id, 
            username: saveUser.username
        }
        const dataUser = {
            username: saveUser.username,
            email: saveUser.email,
            password: saveUser.password
        }
        res.send({ dataUser });
    } 
    catch (err) {
        console.log(err)
        if (err.code === 11000) {
          res.status(409).send('Username already exists');
        } else {
          res.status(500).send('Server error');
        }
    }
};

exports.loginUser = async (req, res, next) => {
    const userData = {
        username: req.body.username,
        password: req.body.password
    }
    try {
        const user = await User.findOne({ username: userData.username });
        if (!user) {
            // username doesn't exist
            return res.status(409).send({ message: 'Username does not exist'});
        } else {
            if(userData.password === user.password) {
                console.log("Session started successfully");
                console.log("we in ");

                const dataUser = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
                res.send({ dataUser });
            } else { 
                return res.status(409).send({ message: 'Incorrect password' });
            }
        } 
    } 
    catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Server error' });
    }
}

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();
    res.json(users)
}

exports.getUserById = async (req, res, next) => {
    const userData = {
        id: req.params.id
    };
    User.findOne({ _id: userData.id })
        .then(user => {
            if (!user) {
                res.status(409).send({ message: 'No matches' });
            } else {
                console.log("User exist")
                res.json(user);
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Server error!' });
        }
        );
}
