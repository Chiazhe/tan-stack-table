const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  fs.readFile("MOCK_DATA.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
      let users = JSON.parse(data);

      const total = users.length;

      // Sorting
      if (req.query.sortBy) {
        let sortBy = req.query.sortBy;
        if (!Array.isArray(sortBy)) {
          sortBy = [sortBy];
        }

        users.sort((a, b) => {
          for (let sort of sortBy) {
            const [field, order] = sort.split(":");
            const sortOrder = order === "desc" ? -1 : 1;
            if (a[field] < b[field]) return -1 * sortOrder;
            if (a[field] > b[field]) return 1 * sortOrder;
          }
          return 0;
        });
      }

      // Filtering
      if (req.query.username) {
        const username_filter = req.query.username.toLowerCase();
        users = users.filter((user) =>
          String(user.username).toLowerCase().includes(username_filter)
        );
      }
      if (req.query.first_name) {
        const first_name_filter = req.query.first_name.toLowerCase();
        users = users.filter((user) =>
          String(user.first_name).toLowerCase().includes(first_name_filter)
        );
      }
      if (req.query.last_name) {
        const last_name_filter = req.query.last_name.toLowerCase();
        users = users.filter((user) =>
          String(user.last_name).toLowerCase().includes(last_name_filter)
        );
      }
      if (req.query.email) {
        const email_filter = req.query.email.toLowerCase();
        users = users.filter((user) =>
          String(user.email).toLowerCase().includes(email_filter)
        );
      }
      if (req.query.country) {
        const country_filter = req.query.country.toLowerCase();
        users = users.filter((user) =>
          String(user.country).toLowerCase().includes(country_filter)
        );
      }
      if (req.query.city) {
        const city_filter = req.query.city.toLowerCase();
        users = users.filter((user) =>
          String(user.city).toLowerCase().includes(city_filter)
        );
      }

      // Pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const total_filtered = users.length;

      users = users.slice(startIndex, endIndex);

      res.json({
        page,
        limit,
        total,
        total_filtered,
        data: users,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error processing request");
    }
  });
});

app.listen(3000);
