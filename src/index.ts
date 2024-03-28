import express, {Request, Response} from "express"
import dotenv from "dotenv"
import User from "./db/models/user"
import Role from "./db/models/role"
import axios from "axios"
import multer from "multer"
import sequelizeConnect from "./config/db.connect"
import { QueryTypes } from "sequelize";

dotenv.config()

const app = express()
app.use(express.json()); 

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    response: "Hello"
  })
})

//nomer 1
app.get("/users-cek", (req: Request, res: Response) => {
  User.findAll({ include: [{ model: Role }] })
    .then((data) => {
      return res.status(200).json({
        status: true,
        message: "Berhasil Mendapatkan Semua User",
        data: data 
      });
    })
    .catch((error) => {
      console.error('Terjadi kesalahan:', error);
      return res.status(400).json({
        status: true,
        message: error.message 
      });
    });
});

//nomer 2
import {admin, client, protect} from "./middleware/authMiddleware"

//nomer 3
const externalApi = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    const data = response.data; 

    return res.status(200).json({
      status: true,
      message: "Berhasil Mendapatkan Data",
      data: data.products
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Terjadi Kesalahan"
    });
  }
};

app.get("/external", externalApi)

//nomer 4
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  try {
    return res.status(200).json({ 
      status: true,
      message: 'Berhasil Upload File' 
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Terjadi Kesalahan"
    })
  }
});

//nomer 5
app.get("/data", async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT 
        u.id as userId,
        u.username,
        r.id as roleId,
        r.roleName as roleName
      FROM 
        Users u
      INNER JOIN 
        Roles r ON u.id = r.id
    `;

    const data = await sequelizeConnect.query(query, { type: QueryTypes.SELECT });

    res.status(200).json({
      status: true,
      message: "Success",
      data: data,
    });
  } catch (error) {
    console.error("Cek Error", error);
    res.status(400).json({
      status: false,
      message: "Terjadi Kesalahan",
    });
  }
});

//nomer 6
const runTransaction = async(req: Request, res: Response) => {
  const {username, password, status, roleName, active} = req.body
  try {
   
    const transaction = await sequelizeConnect.transaction();

    try {
      const userData = await User.create(
        {
          username,
          password,
          status,
        },
        { transaction }
      );

      const roleData = await Role.create(
        {
          roleName,
          active,
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(200).json({status: true, message: "Transaksi berhasil", data: userData,roleData})
    } catch (error) {
      await transaction.rollback();
      console.error("Terjadi kesalahan dalam transaksi:", error);

      return res.status(400).json({
        status: false,
        message: "Terjadi kesalahan dalam transaksi"
      })
    }
  } catch (error) {
    console.error("Gagal membuat transaksi:", error);
    return res.status(400).json({
      status: false,
      message: "Gagal membuat transaksi"
    })
  }
}

app.post("/transaction", runTransaction)

// CREATE: Tambah data pengguna baru
app.post('/users', async (req: Request, res: Response) => {
  try {
    const { username, password, status, roleId } = req.body;

    const newUser = await User.create({
      username,
      password,
      status,
      roleId
    });

    return res.status(201).json({
      success: true,
      message: 'Data pengguna berhasil ditambahkan',
      data: newUser,
    });
  } catch (error) {
    console.error('Error while creating user:', error);

    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan data pengguna',
    });
  }
});

// READ: Baca data pengguna
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Pengguna tidak ditemukan',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data pengguna berhasil ditemukan',
      data: user,
    });
  } catch (error) {
    console.error('Error while fetching user:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data pengguna',
    });
  }
});

// UPDATE: Perbarui data pengguna
app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { username, password, status } = req.body;

    const [updatedRows] = await User.update(
      { username, password, status },
      { where: { id: userId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pengguna tidak ditemukan',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data pengguna berhasil diperbarui',
    });
  } catch (error) {
    console.error('Error while updating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui data pengguna',

    });
  }
});

// DELETE: Hapus data pengguna
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    const deletedRows = await User.destroy({ where: { id: userId } });

    if (deletedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pengguna tidak ditemukan',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data pengguna berhasil dihapus',
    });
  } catch (error) {
    console.error('Error while deleting user:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus data pengguna',
  
    });
  }
});




app.listen(process.env.APP_PORT, () => {
  console.log(`${process.env.APP_NAME} running on port ${process.env.APP_PORT}`)
})