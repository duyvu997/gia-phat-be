const {
  createError,
  BAD_REQUEST,
  NOT_FOUND,
} = require('../../common/error-utils');
const { Project } = require('../../models');

const create = async (project) => {
  const {
    name,
    location,
    investor,
    start_date,
    end_date,
    duration_in_days,
    budget,
    supplies,
    phases,
    staffs,
    status,
  } = project;

  const isExist = await Project.findOne({ name });

  if (isExist) {
    throw createError(BAD_REQUEST, 'username already exists');
  }

  return Project.create({
    name,
    location,
    investor,
    start_date,
    end_date,
    duration_in_days,
    budget,
    supplies,
    phases,
    staffs,
    status,
  });
};

const update = async (projectId, project) => {
  const {
    name,
    location,
    investor,
    start_date,
    end_date,
    duration_in_days,
    budget,
    supplies,
    phases,
    staffs,
    status,
  } = project;

  const savedProject = await Project.findOne({ id: projectId });

  if (!savedProject) {
    throw createError(NOT_FOUND, 'project not found');
  }

  return Project.update(savedProject.id, {
    name,
    location,
    investor,
    start_date,
    end_date,
    duration_in_days,
    budget,
    supplies,
    phases,
    staffs,
    status,
  });
};

const getAll = async () => {
  return Project.find({});
};

const getById = async (projectId) => {
  return Project.findOne({ id: projectId });
};

module.exports = { create, update, getAll, getById };
