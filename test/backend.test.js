const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../index");
const fse = require("fs-extra");
const fs = require("fs");
const axios = require("axios");

// Testing projects, blobs, and categories
const categories = ["test", "cee", "water"];
const categoryAmounts = [6, 3, 1];
const projectList = [
  {
    id: 1,
    title: "First",
    category: "test",
    description: "Hello I am an annoying commentor on Tiktok",
    thumbnail: "three.png"
  },
  {
    id: 2,
    title: "blah",
    category: "test",
    description: "Edgy emo with undiagnosed altruism",
    thumbnail: "kitten.png"
  },
  {
    id: 3,
    title: "a",
    category: "test",
    description: "he a oooooooo...",
    thumbnail: "placeholder.png"
  },
  {
    id: 4,
    title: "Can you hear me?",
    category: "test",
    description: "ECHO Echo echo .... it's very lonely in space",
    thumbnail: "python.png"
  },
  {
    id: 5,
    title: "Mocha",
    category: "test",
    description: "This is a dummy project. FOR MOCHA!",
    thumbnail: "alex.png"
  },
  {
    id: 6,
    title: "Chai",
    category: "test",
    description: "This is a dummy project. FOR CHAI!",
    thumbnail: "bobbby.jpeg"
  },
  {
    id: 7,
    title: "Coffee",
    category: "cee",
    description: "Did you know coffee starts with a 'c'?",
    thumbnail: "gba_purple.jpg"
  },
  {
    id: 8,
    title: "Melon",
    category: "water",
    description: "My favorite melon is watermelon canteloupe is good too. HONEYDEW THO...",
    thumbnail: "holiday puppy party.png"
  },
  {
    id: 9,
    title: "Chocolate",
    category: "cee",
    description: "Chocolate also starts with a 'c'!!!",
    thumbnail: "red is sus.jpg"
  },
  {
    id: 10,
    title: "Candy",
    category: "cee",
    description: "What can I say? Candy is candy!",
    thumbnail: "thanos.png"
  },
];
const fileTypes = ["png", "stl", "jpg", "jpeg", "wav"];
const createBlobList = [
  {
    id: 11,
    fileName: "shield",
    fileType: "stl",
    projectId: 2,
  },
  {
    id: 12,
    fileName: "blah",
    fileType: "stl",
    projectId: 3,
  },
  {
    id: 13,
    fileName: "wata",
    fileType: "wav",
    projectId: 2,
  },
  {
    id: 14,
    fileName: "colors",
    fileType: "png",
    projectId: 6,
  },
  {
    id: 15,
    fileName: "Soikulls",
    fileType: "stl",
    projectId: 7,
  },
  {
    id: 16,
    fileName: "keystep",
    fileType: "png",
    projectId: 8,
  },
  {
    id: 17,
    fileName: "cooked meat",
    fileType: "png",
    projectId: 9,
  },
  {
    id: 18,
    fileName: "smaller bobbby",
    fileType: "jpg",
    projectId: 5,
  },
  {
    id: 19,
    fileName: "switch_lite",
    fileType: "jpg",
    projectId: 2,
  },
  {
    id: 20,
    fileName: "Useless Knob",
    fileType: "stl",
    projectId: 2,
  },
];
const fullBlobList = [
  {
    id: 1,
    fileName: "three",
    fileType: "png",
    projectId: 1,
  },
  {
    id: 2,
    fileName: "kitten",
    fileType: "png",
    projectId: 2,
  },
  {
    id: 3,
    fileName: "placeholder",
    fileType: "png",
    projectId: 3,
  },
  {
    id: 4,
    fileName: "python",
    fileType: "png",
    projectId: 4,
  },
  {
    id: 5,
    fileName: "alex",
    fileType: "png",
    projectId: 5,
  },
  {
    id: 6,
    fileName: "bobbby",
    fileType: "jpeg",
    projectId: 6,
  },
  {
    id: 7,
    fileName: "gba_purple",
    fileType: "jpg",
    projectId: 7,
  },
  {
    id: 8,
    fileName: "holiday puppy party",
    fileType: "png",
    projectId: 8,
  },
  {
    id: 9,
    fileName: "red is sus",
    fileType: "jpg",
    projectId: 9,
  },
  {
    id: 10,
    fileName: "thanos",
    fileType: "png",
    projectId: 10,
  },
  {
    id: 11,
    fileName: "shield",
    fileType: "stl",
    projectId: 2,
  },
  {
    id: 12,
    fileName: "blah",
    fileType: "stl",
    projectId: 3,
  },
  {
    id: 13,
    fileName: "wata",
    fileType: "wav",
    projectId: 2,
  },
  {
    id: 14,
    fileName: "colors",
    fileType: "png",
    projectId: 6,
  },
  {
    id: 15,
    fileName: "Soikulls",
    fileType: "stl",
    projectId: 7,
  },
  {
    id: 16,
    fileName: "keystep",
    fileType: "png",
    projectId: 8,
  },
  {
    id: 17,
    fileName: "cooked meat",
    fileType: "png",
    projectId: 9,
  },
  {
    id: 18,
    fileName: "smaller bobbby",
    fileType: "jpg",
    projectId: 5,
  },
  {
    id: 19,
    fileName: "switch_lite",
    fileType: "jpg",
    projectId: 2,
  },
  {
    id: 20,
    fileName: "Useless Knob",
    fileType: "stl",
    projectId: 2,
  },
];
const newInfo = {
  title: "Latte",
  category: "updated",
  description: "Updated Description",
};

// POST
describe("Handle POST requests", () => {
  describe("POST /create/project", () => {
    projectList.forEach((project) => {
      it(`Title: ${project.title}, Category: ${project.category}, Blob: ${project.thumbnail}`, (done) => {
        chai
          .request(app)
          .post("/create/project")
          .set("Content-Type", "multipart/form-data")
          .field("title", project.title)
          .field("category", project.category)
          .field("description", project.description)
          .attach(
            "thumbnail",
            fse.readFileSync(`${__dirname}/images/${project.thumbnail}`),
            project.thumbnail
          )
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.title).to.equal(project.title);
            expect(res.body.category).to.equal(project.category);
            expect(res.body.description).to.equal(project.description);
            const returnedFileName = `${res.body.thumbnail.fileName}.${res.body.thumbnail.fileType}`;
            expect(returnedFileName).to.equal(project.thumbnail);
            done();
          });
      });
    });
  });
  describe("POST /create/blob", () => {
    createBlobList.forEach((blob) => {
      let project = projectList[blob.projectId-1].title;
      it(`Project: ${project}, Blob: ${blob.fileName}`, (done) => {
        chai
          .request(app)
          .post("/create/blob")
          .set("Content-Type", "multipart/form-data")
          .attach("blob", fse.readFileSync(`${__dirname}/images/${blob.fileName}.${blob.fileType}`), `${blob.fileName}.${blob.fileType}`)
          .field("project", project)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.projectTitle).to.equal(project);
            const returnedFileName = `${res.body.fileName}.${res.body.fileType}`;
            expect(returnedFileName).to.equal(`${blob.fileName}.${blob.fileType}`);
            done();
          });
      });
    });
  });
  describe("POST /update/project", () => {
    it("should update title", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: "Mocha",
          title: newInfo.title,
          category: "",
          description: "",
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal("Mocha");
          expect(res.body.title).to.equal(newInfo.title);
          expect(res.body.category).to.equal("");
          expect(res.body.description).to.equal("");
          done();
        });
    });
    it("should revert title", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: newInfo.title,
          title: "Mocha",
          category: "",
          description: "",
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal(newInfo.title);
          expect(res.body.title).to.equal("Mocha");
          expect(res.body.category).to.equal("");
          expect(res.body.description).to.equal("");
          done();
        });
    });
    it("should update description", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: "Mocha",
          title: "",
          category: "",
          description: newInfo.description,
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal("Mocha");
          expect(res.body.title).to.equal("");
          expect(res.body.description).to.equal(newInfo.description);
          expect(res.body.category).to.equal("");
          done();
        });
    });
    it("should revert description", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: "Mocha",
          title: "",
          category: "",
          description: "This is a dummy project. FOR MOCHA!",
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal("Mocha");
          expect(res.body.title).to.equal("");
          expect(res.body.category).to.equal("");
          expect(res.body.description).to.equal(
            "This is a dummy project. FOR MOCHA!"
          );
          done();
        });
    });
    it("should update category", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: "Mocha",
          title: "",
          category: newInfo.category,
          description: "",
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal("Mocha");
          expect(res.body.title).to.equal("");
          expect(res.body.category).to.equal(newInfo.category);
          expect(res.body.description).to.equal("");
          done();
        });
    });
    it("should revert category", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: "Mocha",
          title: "",
          category: "test",
          description: "",
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal("Mocha");
          expect(res.body.title).to.equal("");
          expect(res.body.category).to.equal("test");
          expect(res.body.description).to.equal("");
          done();
        });
    });
    it("should update title and description", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: "Mocha",
          title: newInfo.title,
          category: "",
          description: newInfo.description,
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal("Mocha");
          expect(res.body.title).to.equal(newInfo.title);
          expect(res.body.category).to.equal("");
          expect(res.body.description).to.equal(newInfo.description);
          done();
        });
    });
    it("should revert title and description", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: newInfo.title,
          title: "Mocha",
          category: "",
          description: "This is a dummy project. FOR MOCHA!",
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal(newInfo.title);
          expect(res.body.title).to.equal("Mocha");
          expect(res.body.category).to.equal("");
          expect(res.body.description).to.equal(
            "This is a dummy project. FOR MOCHA!"
          );
          done();
        });
    });
    it("should update description and category", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: "Mocha",
          title: "",
          category: newInfo.category,
          description: newInfo.description,
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal("Mocha");
          expect(res.body.title).to.equal("");
          expect(res.body.category).to.equal(newInfo.category);
          expect(res.body.description).to.equal(newInfo.description);
          done();
        });
    });
    it("should revert description and category", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: "Mocha",
          title: "",
          category: "test",
          description: "This is a dummy project. FOR MOCHA!",
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal("Mocha");
          expect(res.body.title).to.equal("");
          expect(res.body.category).to.equal("test");
          expect(res.body.description).to.equal(
            "This is a dummy project. FOR MOCHA!"
          );
          done();
        });
    });
    it("should update category and title", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: "Mocha",
          title: newInfo.title,
          category: newInfo.category,
          description: "",
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal("Mocha");
          expect(res.body.title).to.equal(newInfo.title);
          expect(res.body.category).to.equal(newInfo.category);
          expect(res.body.description).to.equal("");
          done();
        });
    });
    it("should revert category and title", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: newInfo.title,
          title: "Mocha",
          category: "test",
          description: "",
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal(newInfo.title);
          expect(res.body.title).to.equal("Mocha");
          expect(res.body.category).to.equal("test");
          expect(res.body.description).to.equal("");
          done();
        });
    });
    it("should update title, description, and category", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: "Mocha",
          title: newInfo.title,
          category: newInfo.category,
          description: newInfo.description,
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal("Mocha");
          expect(res.body.title).to.equal(newInfo.title);
          expect(res.body.category).to.equal(newInfo.category);
          expect(res.body.description).to.equal(newInfo.description);
          done();
        });
    });
    it("should revert title, description, and category", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: newInfo.title,
          title: "Mocha",
          category: "test",
          description: "This is a dummy project. FOR MOCHA!",
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal(newInfo.title);
          expect(res.body.title).to.equal("Mocha");
          expect(res.body.category).to.equal("test");
          expect(res.body.description).to.equal(
            "This is a dummy project. FOR MOCHA!"
          );
          done();
        });
    });
    it("should update nothing", (done) => {
      chai
        .request(app)
        .post("/update/project")
        .send({
          oldtitle: "Mocha",
          title: "",
          category: "",
          description: "",
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.oldtitle).to.equal("Mocha");
          expect(res.body.title).to.equal("");
          expect(res.body.category).to.equal("");
          expect(res.body.description).to.equal("");
          done();
        });
    });
  });
});

// GET AGAIN
describe("Handle GET requests", () => {
  describe("GET /", () => {
    it("should get README.html", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.be.a("Object");
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          done();
        });
    });
  });
  describe("GET /projects", () => {
    it("should get all projects", (done) => {
      chai
        .request(app)
        .get("/projects")
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.be.a("Object");
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.lengthOf(10);
          res.body.forEach((project) => {
            expect(project).to.be.a("Object");
            expect(project.category).to.exist;
            expect(project.title).to.exist;
            expect(project.description).to.exist;
          });
          done();
        });
    });
  });

  describe("GET /project/:id", () => {
    for (let id = 1; id <= 10; id++) {
      it(`should get project ${id}`, (done) => {
        chai
          .request(app)
          .get(`/project/${id}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.be.a("Object");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0].id).to.equal(id);
            done();
          });
      });
    }
  });

  describe("GET /project/:title", () => {
    projectList.forEach((project) => {
      it(`should get project "${project.title}"`, (done) => {
        chai
          .request(app)
          .get(`/project/${encodeURIComponent(project.title)}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.be.a("Object");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0].title).to.equal(project.title);
            done();
          });
      });
    });
  });

  describe("GET /projects/category/:category", () => {
    categories.forEach((category) => {
      it(`should get projects in the ${category} category`, (done) => {
        chai
          .request(app)
          .get(`/project/category/${category}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.be.a("Object");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            res.body.forEach((project) => {
              expect(project.category).to.equal(category);
            });
            done();
          });
      });
    });
  });

  describe("GET /projects/:category/recent/:amount", () => {
    for (let i = 0; i < 3; i++) {
      let category = categories[i];
      let maxAmount = categoryAmounts[i];

      for (let amount = 1; amount <= maxAmount; amount++) {
        it(`should get ${amount} most recent project(s) in ${category} category`, (done) => {
          chai
            .request(app)
            .get(`/project/${category}/recent/${amount}`)
            .end((err, res) => {
              expect(err).to.equal(null);
              expect(res).to.be.a("Object");
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.have.lengthOf(amount);
              res.body.forEach((project) => {
                expect(project).to.be.a("Object");
                expect(project.category).to.equal(category);
              });
              done();
            });
        });
      }
    }
  });

  describe("GET /projects/:category/oldest/:amount", () => {
    for (let i = 0; i < 3; i++) {
      let category = categories[i];
      let maxAmount = categoryAmounts[i];

      for (let amount = 1; amount <= maxAmount; amount++) {
        it(`should get ${amount} oldest project(s) in ${category} category`, (done) => {
          chai
            .request(app)
            .get(`/project/${category}/oldest/${amount}`)
            .end((err, res) => {
              expect(err).to.equal(null);
              expect(res).to.be.a("Object");
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.have.lengthOf(amount);
              res.body.forEach((project) => {
                expect(project).to.be.a("Object");
                expect(project.category).to.equal(category);
              });
              done();
            });
        });
      }
    }
  });

  describe("GET /blobs", () => {
    it("should get all blobs", (done) => {
      chai
        .request(app)
        .get("/blobs")
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.be.a("Object");
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.lengthOf(20);
          res.body.forEach((blob) => {
            expect(blob).to.be.a("Object");
            expect(blob.fileName).to.exist;
            expect(blob.fileType).to.exist;
            fullBlobList[blob.id-1] = blob;
          });
          done();
        });
    });
  });

  describe("GET /blob/:id", () => {
    for (let blobId = 1; blobId <= 20; blobId++) {
      it(`should get blob ${blobId}`, (done) => {
        chai
          .request(app)
          .get(`/blob/${blobId}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.be.a("Object");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0].id).to.equal(blobId);
            expect(res.body[0].fileName).to.equal(
              fullBlobList[blobId - 1].fileName
            );
            done();
          });
      });
    }
  });

  describe("GET /blob/:filename", () => {
    for (let i = 1; i <= 20; i++) {
      let blobName = fullBlobList[i-1].fileName;
      let blobId = fullBlobList[i-1].id;
      it(`should get blob ${blobName}`, (done) => {
        chai
          .request(app)
          .get(`/blob/${blobName}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.be.a("Object");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0].id).to.equal(blobId);
            expect(res.body[0].fileName).to.equal(blobName);
            done();
          });
      });
    }
  });

  describe("GET /blob/type/:filetype", () => {
    fileTypes.forEach((fileType) => {
      it(`should get all .${fileType} blobs`, (done) => {
        chai
          .request(app)
          .get(`/blob/type/${fileType}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.be.a("Object");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            res.body.forEach((blob) => {
              expect(blob.fileType).to.equal(fileType);
            });
            done();
          });
      });
    });
  });

  describe("GET /project/:projectid/blobs", () => {
    projectList.forEach((project) => {
      it(`should get all blobs for ${project.title}`, (done) => {
        chai
          .request(app)
          .get(`/project/${project.id}/blobs`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.be.a("Object");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            res.body.forEach((blob) => {
              expect(blob.projectId).to.equal(project.id);
              expect(blob.fileName).to.exist;
              expect(blob.fileType).to.exist;
            });
            done();
          });
      });
    });
  });

  describe("GET /project/:projectid/thumbnail", () => {
    for (let projectId = 1; projectId <= 10; projectId++) {
      it(`should get thumbnail for project ${projectId}`, (done) => {
        chai
          .request(app)
          .get(`/project/${projectId}/thumbnail`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.be.a("Object");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.lengthOf(1);
            const thumbnail = res.body[0];
            expect(thumbnail.projectId).to.equal(projectId);
            expect(thumbnail.fileName).to.exist;
            expect(thumbnail.fileType).to.exist;
            done();
          });
      });
    }
  });
});

// DELETE
describe("Handle DELETE requests", () => {
  after(() => {
    fs.rmdir(
      "/Users/jeshwinprince/jedio/server/public/jpg",
      { recursive: true },
      (err) => {
        console.error(err);
      }
    );
    fs.rmdir(
      "/Users/jeshwinprince/jedio/server/public/jpeg",
      { recursive: true },
      (err) => {
        console.error(err);
      }
    );
    fs.rmdir(
      "/Users/jeshwinprince/jedio/server/public/png",
      { recursive: true },
      (err) => {
        console.error(err);
      }
    );
    fs.rmdir(
      "/Users/jeshwinprince/jedio/server/public/stl",
      { recursive: true },
      (err) => {
        console.error(err);
      }
    );
  });

  describe("DELETE /delete/project/:id", () => {
    for (let id = 1; id <= 10; id++) {
      it(`should delete project ${id}`, (done) => {
        chai
          .request(app)
          .delete(`/delete/project/${id}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.be.a("Object");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.success).to.exist;
            done();
          });
      });
    };
  });
  describe("DELETE /delete/blob/:id", () => {
    for (let id = 1; id <= 20; id++) {
      it(`should delete blob ${id}`, (done) => {
        chai
          .request(app)
          .delete(`/delete/blob/${id}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.be.a("Object");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.success).to.exist;
            done();
          });
      });
    };
  });
  describe("DELETE /delete/category/:category", () => {
    const categories = ["test", "cee", "water"];
    categories.forEach((category) => {
      it(`should delete category ${category}`, (done) => {
        chai
          .request(app)
          .delete(`/delete/category/${category}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res).to.be.a("Object");
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
          });
      });
    });
  });
});
