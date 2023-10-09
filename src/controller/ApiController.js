import pool from "../config/connectDB";

const getAllUser = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `staff`");
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};

const createNewUser = async (req, res) => {
  let { name, email, address, sex } = req.body;
  if (!name || !email || !address || !sex) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await pool.execute(
    "insert into `staff`(name, email, address, sex) values(?,?,?,?)",
    [name, email, address, sex]
  );
  return res.status(200).json({
    message: "ok",
  });
};

const updateUser = async (req, res) => {
  let { name, email, sex, address, id } = req.body;
  if (!name || !email || !address || !sex || !id) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await pool.execute(
    "UPDATE `staff` set name=?, email = ?, sex=?, address=? where id=?",
    [name, email, sex, address, id]
  );
  return res.status(200).json({
    message: "ok",
  });
};

const deleteUser = async (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await pool.execute("delete from users where id = ?", [userId]);
  return res.status(200).json({
    message: "ok",
  });
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
};
