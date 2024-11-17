import Technician from "../models/technician.model.js";

const employeeRoute = async (req, res, next) => {
  // Bu uygulamada sadece teknisyen rolünde çalışanımız olduğu için sadece teknistenleri kontrol ettim.
  try {
    const reqEmployee = await Technician.findById(req.userId);
    if (!reqEmployee) {
      return res.status(401).json({ message: "Yetkisiz erişim." });
    }
    next();
  } catch (error) {
    console.log("Error in employeeRoute:", error);
    return res.status(500).json({ message: "Bir hata oluştu.", error });
  }
};
export default employeeRoute;
