const CronJob = require("cron").CronJob;
const nodemailer = require("nodemailer");
const { models } = require("./models");
const { Op } = require("sequelize");

const configOptions = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

module.exports.createDailyJob = () => {
  const job = new CronJob(
    "0 0 8 * * *",
    function () {
      console.log("Running Send Mail Job");
      const { Task, User } = models;
      User.findAll().then((users) => {
        let content = "";
        users.forEach((user) => {
          Task.findAll({
            where: {
              user_id: user.id,
              start_time: {
                [Op.and]: {
                  [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
                  [Op.lte]: new Date(new Date().setHours(23, 59, 59, 999)),
                },
              },
            },
          }).then((tasks) => {
            tasks.forEach((task) => {
              content += `Title: ${task.title}\nDescription: ${task.description}\nStart time: ${task.start_time}\npriority: ${task.priority}\nprogress: ${task.progress}\n`;
            });
            if (content) {
              module.exports.sendMail(
                user.email,
                "Sunflower ITSS - Today's tasks",
                content
              );
            }
          });
        });
      });
    },
    null,
    true,
    "Asia/Ho_Chi_Minh"
  );
  job.start();
};

module.exports.checkingTask = () => {
  setInterval(async () => {
    const { Task, User } = models;
    const tasks = await Task.findAll();
    tasks.forEach(task => {
      let deadline = new Date(task.start_time).getTime();
      let now = Date.now();
      let time = (deadline.getTime() - now)/1000/60;
      if (time < 17 && time >= 0) {
        User.findOne({where: {
          id: task.user_id
        }}).then(user => {
          if (user) {
            let content = `Title: ${task.title}\nDescription: ${task.description}\nStart time: ${task.start_time}\npriority: ${task.priority}\nprogress: ${task.progress}\n`;
            let cc = "";
            if (time > 12) {
              cc = "Sunflower ITSS - 15' time out";
            } else if (time < 5) {
              cc = "Sunflower ITSS - time out";
            }
            module.exports.sendMail(user.email, cc, content);
          }
        })
      }
    })
  }, 3000000)
}

module.exports.sendMail = (email, subject, content) => {
  const transporter = nodemailer.createTransport(configOptions);
  const mailOptions = {
    from: "Sunflower ITSS",
    to: email,
    subject,
    text: content,
  };

  try {
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
