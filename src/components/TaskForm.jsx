import React, { useEffect, useState } from "react";

const TaskForm = ({ addTask, updateTask, editingTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(editingTask);
  }, [editingTask]);

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "title is required.";
    } else if (formData.title.length < 6) {
      newErrors.title = "Minimum 6 character required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "description is required.";
    } else if (formData.description.length <= 6) {
      newErrors.description = "Minimum 6 character required.";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "date is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    //console.log(e.target.name,e.target.value)

    //e.target.name = e.target.value
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (editingTask) {
        updateTask(formData);
      } else {
        addTask(formData);
      }
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
    });
  };

  return (
    <>
      <div className="add-task-card">
        <h2 style={{ marginBottom: "15px" }}>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="title"
              value={formData?.title}
              placeholder="Task Title"
              onChange={handleInputChange}
            />
            {/* Error Massage */}
            {errors.title && <span className="error-msg">{errors.title}</span>}
          </div>

          <div>
            <textarea
              placeholder="Description"
              value={formData?.description}
              name="description"
              rows="3"
              onChange={handleInputChange}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <input
                type="date"
                value={formData?.dueDate}
                name="dueDate"
                onChange={handleInputChange}
              />
              {errors.dueDate && (
                <span className="error-msg">{errors.dueDate}</span>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <select
                name="priority"
                value={formData?.priority}
                onChange={handleInputChange}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>
          </div>

          <div
            className="form-actions"
            style={{ display: "flex", gap: "10px", marginTop: "10px" }}
          >
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              {editingTask ? "Update" : "Add"} Task
            </button>

            <button type="button" className="btn-secondary" style={{ flex: 1 }}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
