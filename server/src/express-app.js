const { validationResult } = require("express-validator");
const createModel = require("./Model/domodel");
const { creationTimeValidate, updateTimeValidate, listByIdMiddleWare } = require("../src/middleware/commonValidator");
const { userAuth, generateWebToken } = require("../src/utils/index");
const { ObjectId } = require("mongodb")

module.exports = async (app) => {
    app.post("/", (req, res) => {
        res.status(200).json({ welcome: "hello folks !! , greate to have you !" })
    });

    app.post("/create", [userAuth, creationTimeValidate], async (req, res) => {
        try {

            const errors = validationResult(req);
            const formdata = req.body;

            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array())
            }

            const query = [];

            const matchingStage = {
                $match: {
                    user_name: formdata.user_name,
                },
            };
            query.push(matchingStage);

            const isExist = await createModel.aggregate(query);

            if (isExist.length === 0) {
                const instanceOfCreate = new createModel(formdata);
                const result = await instanceOfCreate.save();

                return res.json(result);
            }
            else {
                return res.status(400).json({ message: "Already exist user name !!", suggestion: "Use other user name to move a head !!", status: 400 })
            }



        } catch (error) {
            console.log("hey this got an error !! please check it , ", error);
            return error;
        }
    });

    app.post("/update", [userAuth, updateTimeValidate], async (req, res) => {
        try {

            const formdata = req.body;

            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.status(400).json(error.array());
            }
            const id = req.body.id;

            const findInTheDocument = await createModel.findOneAndUpdate({ _id: id }, { $set: formdata }, { new: true });
            console.log("findInTheDocument", findInTheDocument)
            if (findInTheDocument) {
                return res.status(200).json({ updatedData: findInTheDocument })
            } else {
                return res.status(400).json({ findInTheDocument })
            }

        } catch (error) {
            console.log("hey this got an error !! please check it , ", error);
        }
    });

    app.get("/list", userAuth, async (req, res) => {
        try {
            const query = [];
            const sorting = {
                $sort: { createdAt: -1 }
            }
            query.push(sorting);
            const findAll = await createModel.aggregate(query);
            return res.json(findAll);
        } catch (error) {
            console.log("hey this got an error !! please check it , ", error);
        }
    });

    app.post("/generatetoken", async (req, res) => {
        try {
            const formData = req.body;

            const token = await generateWebToken(req.body);

            return res.status(200).json({ "token": token });
        } catch (error) {
            console.log("hey this got an error !! please check it , ", error);
        }
    });

    app.post("/list/id", [userAuth, listByIdMiddleWare], async (req, res, next) => {
        try {

            const error = await validationResult(req);

            if (!error.isEmpty()) {
                return res.status(400).json(error.array())
            }

            const formdata = req.body;

            const query = [];

            const matchingStage = {
                $match: {
                    _id: new ObjectId(formdata._id)
                }
            };

            query.push(matchingStage);

            const getTheData = await createModel.aggregate(query);

            if (getTheData.length != 0) {
                res.status(200).json({ data: `got the data to this id`, data: getTheData })
            }
            else {
                res.status(400).json({ data: "not found record on this id ! please check again !!" })
            }

        } catch (error) {
            console.log("there is an error while listing the data specifically in the id filter in api layer , and the error is ===>", error);
        }
    });

    app.delete("/delete", [userAuth, updateTimeValidate], async (req, res) => {
        try {

            const error = await validationResult(req);

            if (!error.isEmpty()) {
                return res.status(400).json(error.array())
            }

            const formdata = req.body;

            const id = formdata.id;

            console.log("id is ", id);

            const deletingId = await createModel.findByIdAndDelete({ _id: id })

            if (deletingId) {
                res.status(200).json({ data: "data deleted successfully" })
            } else {
                // this is if deleteingId is null

                res.status(400).json({ message: "data is not deleted ! please check again , it may be already deleted" })
            }

        } catch (error) {
            console.log("error while deleting the record and the error is==>>", error)
        }
    });
}