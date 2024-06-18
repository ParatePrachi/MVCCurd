using MVCCurd.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVCCurd.Models
{
    public class RegistrationModel
    {
        public int RegId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string MobileNo { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }

        public string SaveReg(RegistrationModel model)
        {
            string message = "";
            EmployeeEntities db = new EmployeeEntities();
            var saveemp = new tblReg()
            {
                Name = model.Name,
                Address = model.Address,
                MobileNo = model.MobileNo,
                UserName = model.UserName,
                PassWord = model.PassWord,
            };
            db.tblRegs.Add(saveemp);
            db.SaveChanges();
            return message;
        }
        public List<RegistrationModel> GetList()
        {
            EmployeeEntities Db = new EmployeeEntities();
            List<RegistrationModel> lstreg = new List<RegistrationModel>();
            var GetList = Db.tblRegs.ToList();
            if (GetList != null)
            {
                foreach (var reg in GetList)
                {
                    lstreg.Add(new RegistrationModel()
                    {
                        RegId = reg.RegId,
                        Name = reg.Name,
                        Address = reg.Address,
                        MobileNo = reg.MobileNo,
                        UserName = reg.UserName,
                        PassWord = reg.PassWord,

                    });
                }
            }
            return lstreg;
        }
        public RegistrationModel Details (int RegId)
        {
            string msg = "";
            RegistrationModel model = new RegistrationModel();
            EmployeeEntities db = new EmployeeEntities();
            var registration = db.tblRegs.Where(p => p.RegId == RegId).FirstOrDefault();
            if (registration != null)
            {
                model.RegId = registration.RegId;
                model.Name = registration.Name;
                model.Address = registration.Address;
                model.MobileNo = registration.MobileNo;
                model.UserName = registration.UserName;
                model.PassWord = registration.PassWord;
            }
            return model;
        }
    }
}