using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using MVCCurd.Data;


namespace MVCCurd.Models
{
    public class EmployeeModel
    {
        public int Id { get; set; }
        public string EmpName { get; set; }
        public string EmpAddress { get; set; }
        public int MobileNo { get; set; }
        public Nullable<int> Pincode { get; set; }

        public string Photo { get; set; }   

        public string SaveEmp(HttpPostedFileBase fb0, EmployeeModel model)
        {
            string message = "";
            EmployeeEntities db = new EmployeeEntities();
            string filePath = "";
            string fileName = "";
            string sysFileName = "";
            if (fb0 != null && fb0.ContentLength > 0)
            {
                filePath = HttpContext.Current.Server.MapPath("~/Content/img/");
                DirectoryInfo di = new DirectoryInfo(filePath);
                if (!di.Exists)
                {
                    di.Create();
                }
                fileName = fb0.FileName;
                sysFileName = DateTime.Now.ToFileTime().ToString() + Path.GetExtension(fb0.FileName);
                fb0.SaveAs(filePath + "//" + sysFileName);
                if (!string.IsNullOrWhiteSpace(fb0.FileName))
                {
                    string afileName = HttpContext.Current.Server.MapPath("~/Content/img/") + "/" + sysFileName;
                }
            }
            var getData = db.tblemps.Where(p => p.Id == model.Id).FirstOrDefault();

            if (getData == null)
            {
                var saveemp = new tblemp()
                {
                    EmpName = model.EmpName,
                    EmpAddress = model.EmpAddress,
                    MobileNo = model.MobileNo,
                    Pincode = model.Pincode,
                    Photo = sysFileName,
                };

                db.tblemps.Add(saveemp);
                db.SaveChanges();
                return message;
            }
            else
            {
                getData.EmpName = model.EmpName;
                getData.EmpAddress = model.EmpAddress;
                getData.MobileNo = model.MobileNo;
                getData.Pincode = model.Pincode;
                getData.Photo = model.Photo;
            };
            db.SaveChanges();
            message = "Updated Sucessfully";
            return message;
        }
        public List<EmployeeModel> GetList()
        {
            EmployeeEntities Db = new EmployeeEntities();
            List<EmployeeModel> lstemp = new List<EmployeeModel>();
            var GetList = Db.tblemps.ToList();
            if (GetList != null)
            {
                foreach (var employee in GetList)
                {
                    lstemp.Add(new EmployeeModel()
                    {
                        Id = employee.Id,
                        EmpName = employee.EmpName,
                        EmpAddress = employee.EmpAddress,
                        MobileNo = employee.MobileNo,
                        Pincode = employee.Pincode,
                        Photo = employee.Photo,

                    });
                }
            }
            return lstemp;
        }
        public string deleteEmp(int id)
        {
            string Message = "";
            EmployeeEntities db = new EmployeeEntities();
            var deleteemp = db.tblemps.Where(p => p.Id == id).FirstOrDefault();
            if (deleteemp != null)
            {
                db.tblemps.Remove(deleteemp);
            };
            db.SaveChanges();
            Message = "Delete Successfully";
            return Message;
        }

        public EmployeeModel EditEmp(int id)
        {
            string Message = "";
            EmployeeModel model = new EmployeeModel();
            EmployeeEntities db = new EmployeeEntities();
            var edititem = db.tblemps.Where(p => p.Id == id).FirstOrDefault();
            if (edititem != null)
            {
                model.Id = edititem.Id;
                model.EmpName = edititem.EmpName;
                model.EmpAddress = edititem.EmpAddress;
                model.MobileNo = edititem.MobileNo;
                model.Pincode = edititem.Pincode;
                model.Photo = edititem.Photo;
            }
            Message = "Update ";
            return model;
        }
    }
}