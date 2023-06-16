// controllers/authController.js

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password, fullName, email } = req.body;
    const profilePhoto = req.file;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Kullanıcı adı zaten kullanımda" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword, fullName, email });

    // Profil fotoğrafını kaydetme işlemi
    if (profilePhoto) {
      const filePath = profilePhoto.path;
      // Dosyayı kaydedeceğiniz dizini buraya belirtin
      const destinationPath = `uploads/${profilePhoto.filename}`;
      await fs.promises.rename(filePath, destinationPath);
      user.profilePhoto = destinationPath;
    }

    await user.save();

    res.status(201).json({ message: "Kullanıcı kaydedildi" });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Geçersiz şifre" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Cookie oluştur ve ayarla
    res.cookie("token", token, {
      httpOnly: true,
      // diğer cookie ayarlarını burada belirtebilirsiniz
    });

    res.status(200).json({ token, fullName: user.fullName, email: user.email }); // fullName değerini döndür

  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

