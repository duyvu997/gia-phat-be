const projectService = require('./project-service');

const getAll = async (req, res) => {
  const result = await projectService.getAll();

  return res.status(200).json({ data: result });
};

const create = async (req, res) => {
  const project = req.body;
  const result = await projectService.create(project);

  return res.status(200).json({ data: result });
};

const update = async (req, res) => {
  const project = req.body;
  const projectId = req.params.projectId;
  const result = await projectService.update(projectId, project);

  return res.status(200).json({ data: result });
};

const getById = async (req, res) => {
  const projectId = req.params.projectId;
  const result = await projectService.getById(projectId);

  return res.status(200).json({ data: result });
};

module.exports = {
  getAll,
  create,
  update,
  getById,
};
