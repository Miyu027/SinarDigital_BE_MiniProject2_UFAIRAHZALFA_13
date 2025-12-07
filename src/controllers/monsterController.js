const prisma = require("../utils/prismaClient");

module.exports = {
  create: async (req, res) => {
    try {
      const { name, level } = req.body;
      const image = req.file ? req.file.filename : null;

      const monster = await prisma.monster.create({
        data: {
          name,
          level: Number(level),
          image,
        },
      });

      res.json(monster);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating monster" });
    }
  },

  getAll: async (req, res) => {
    try {
      const monsters = await prisma.monster.findMany();
      res.json(monsters);
    } catch (error) {
      res.status(500).json({ error: "Error getting monsters" });
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const monster = await prisma.monster.findUnique({
        where: { id: Number(id) },
      });
      res.json(monster);
    } catch (error) {
      res.status(500).json({ error: "Error getting monster" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, level } = req.body;
      const image = req.file ? req.file.filename : undefined;

      const monster = await prisma.monster.update({
        where: { id: Number(id) },
        data: {
          name,
          level: Number(level),
          ...(image && { image }),
        },
      });

      res.json(monster);
    } catch (error) {
      res.status(500).json({ error: "Error updating monster" });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.monster.delete({
        where: { id: Number(id) },
      });
      res.json({ message: "Monster deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting monster" });
    }
  },
};
