import React from "react";

const NotificationForm = (props) => {
  return (
    <form
      action=""
      className="flex justify-content-center flex-col max-w-xl mt-10"
    >
      <h2 className="text-3xl">Notification Form</h2>
      <div className="w-100 flex flex-col mt-2">
        <label htmlFor="heading">Heading</label>
        <input type="text" name="heading" id="heading" className="py-2" />
      </div>
      <div className="w-100 flex flex-col mt-5">
        <label htmlFor="body">Body</label>
        <textarea className="h-52" type="text" name="body" id="body" />
      </div>
      <button
        type="submit"
        className="notificationform__submit-button py-3 px-5 bg-indigo-400 rounded inline-block mt-10 text-white font-medium"
      >
        Submit Form
      </button>
    </form>
  );
};

export default NotificationForm;
