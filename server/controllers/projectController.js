import Project from "../models/Project.js";
import User from "../models/User.js";

const createProject = async (req, res) => {
  try {
    const { projectName, startDate, endDate, description } = req.body;

    const userId = req.user.userId;

    const project = new Project({
      projectName,
      startDate,
      endDate,
      description,
      user: userId,
    });

    await project.save();

    // Kullanıcıya ait projeyi projeler listesine ekleyin
    await User.findByIdAndUpdate(userId, { $push: { projects: project._id } });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.message, selam: "selam" });
  }
};

// Kullanıcının tüm projelerini getir
const getUserProjects = async (req, res) => {

  try {
    const { userId } = req.user; // Kullanıcı bilgisi, kimlik doğrulama işleminden alınmalıdır
    const projects = await Project.find({ user: userId }).sort({ startDate: +1 }).sort({ endDate: +1 });

    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteUserProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    // Silinecek proje kimliğini alın

    // Proje silme işlemini gerçekleştirin
    await Project.findByIdAndRemove(projectId);

    res.status(200).json({ success: true, message: 'Proje başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Proje silinirken bir hata oluştu' });
  }
};

export { createProject, getUserProjects, deleteUserProject };
