import pool from "../config/connectDB";

const getHomePage = async (req, res) => {
  // let data = [];
  // connection.query("SELECT * FROM `staff`", function (err, results, fields) {
  //   results.map((row) => {
  //     data.push({
  //       id: row.id,
  //       name: row.name,
  //       email: row.email,
  //       sex: row.sex,
  //       date: row.date,
  //       address: row.address,
  //     });
  //   });
  //   return res.render("index.ejs", { dataUser: data });
  // });

  const [rows, fields] = await pool.execute("SELECT * FROM `staff`");
  return res.render("index.ejs", { dataUser: rows });
};

const getDetailPage = async (req, res) => {
  let userID = req.params.id;
  let [user] = await pool.execute("SELECT * FROM `staff` where id = ?", [
    userID,
  ]);
  return res.send(JSON.stringify(user));
};

const createNewUser = async (req, res) => {
  let { email, name, address, sex } = req.body;

  await pool.execute(
    "insert into staff(name, email, sex,  address) value(?,?,?,?)",
    [name, email, sex, address]
  );
  return res.redirect("/");
};

const deleteUser = async (req, res) => {
  let userID = req.params.id;
  await pool.execute("DELETE FROM `staff` where id = ?", [userID]);
  return res.redirect("/");
};

const getUpdateUser = async (req, res) => {
  let userID = req.params.id;
  let [rows, fields] = await pool.execute(
    "SELECT * FROM `staff` where id = ?",
    [userID]
  );
  return res.render("updateUser.ejs", { dataUser: rows[0] });
};

const updateUser = async (req, res) => {
  let { name, email, sex, address, id } = req.body;
  await pool.execute(
    "UPDATE `staff` set name=?, email = ?, sex=?, address=? where id=?",
    [name, email, sex, address, id]
  );
  return res.redirect("/");
};

const getUploadFilePage = (req, res) => {
  return res.render("uploadNewFile.ejs");
};

let handleUploadFile = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }
  // Display uploaded image for user validation
  res.send(
    `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
  );
};

const handleUploadMultipleFiles = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select some images to upload");
  }
  let results = "You have uploaded these files: <hr/>";
  const file = req.files;
  let i;
  for (i = 0; i < file.length; i++) {
    results += `<img src="/image/${file[i].filename}" width="300" style="margin-right: 20px;">`;
  }
  results += `<hr/><a href="/upload">Upload more images</a>`;
  res.send(results);
};

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getUpdateUser,
  updateUser,
  getUploadFilePage,
  handleUploadFile,
  handleUploadMultipleFiles,
};
