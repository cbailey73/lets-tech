module.exports = {
    format_time: (date) => {
      return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
      });
  },
  };
  