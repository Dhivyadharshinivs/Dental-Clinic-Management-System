import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaMoneyBill, FaUser, FaUsers, FaHandHoldingMedical, FaNotesMedical,  FaUserCog } from "react-icons/fa";
import { HiUser } from "react-icons/hi";
import { SiGooglemessages } from "react-icons/si";
import { BiCog } from "react-icons/bi";
import { AiFillMedicineBox,  AiTwotoneMedicineBox, AiFillAccountBook } from "react-icons/ai";
import { RiBillFill } from "react-icons/ri";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/main",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/main/Patient",
    name: "Patient",
    icon: <HiUser />,
    subRoutes: [
      {
        path: "/main/ViewPatient",
        name: "View Patient",
        icon: <FaUsers />,
      },
      {
        path: "/main/SendMsg",
        name: "Notification Mail",
        icon: <SiGooglemessages />,
      },
    ],
  },
  {
    path: "/main/Apothecary",
    name: "Apothecary",
    icon: <AiFillMedicineBox />,
    subRoutes: [
      {
        path: "/main/Stock",
        name: "Stock Details",
        icon: <FaHandHoldingMedical />,
      },
      {
        path: "/main/Notification",
        name: "Restock Notifier",
        icon: <FaHandHoldingMedical />,
      },
      {
        path: "/main/Restock",
        name: "Restock Details",
        icon: <FaNotesMedical />,
      },
      {
        path: "/main/Sales",
        name: "Sales Details",
        icon: <FaMoneyBill />,
      },
      {
        path: "/Billing",
        name: "Billing",
        icon: <RiBillFill />,
      },
    ],
  },
  {
    path: "/main/Staff",
    name: "Staff",
    icon: <FaUser />,
    
  },
  {
    path: "/main/Equpt",
    name: "Equipments",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/main/MedicalEquipments",
        name: "Medical Equipments",
        icon: <AiTwotoneMedicineBox />,
      },
      {
        path: "/main/Service",
        name: "Equipments Service",
        icon: <FaUserCog />,
      },
    ],
  },
  {
    path: "/main/Report",
    name: "Report Generation",
    icon: <AiFillAccountBook />,
    subRoutes: [
      {
        path: "/main/PntReport",
        name: "Patient Report",
        icon: <FaMoneyBill />,
      },
      {
        path: "/main/Equip",
        name: "Equipments Purchase Report",
        icon: <FaMoneyBill />,
      },
      {
        path: "/main/EquipSales",
        name: "Equipments Service Report",
        icon: <FaMoneyBill />,
      },
      {
        path: "/main/Med",
        name: "Medicine Purchase Report",
        icon: <FaMoneyBill />,
      },
      {
        path: "/main/MedSales",
        name: "Medicine Sales Report",
        icon: <FaMoneyBill />,
      },
      {
        path: "/main/PntSurgeryR",
        name: "Patient Surgery Report",
        icon: <FaMoneyBill />,
      },
      {
        path: "/main/GrpSurgeryR",
        name: "Group Surgery Report",
        icon: <FaMoneyBill />,
      },
    ],
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "250px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Admin
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;