// !production content seed
const seedArray = [
  {
    email: "admin@admin.com",
    password: "$2y$12$5YQUIpndI8hM4vRUBWI96efu6gMsj.EfPNei5TIcMn35PYWJIbDQ.", //admin
    first_name: "Admin",
    middle_name: "middle",
    last_name: "User",
    phone: "7737737737",
    address: "19909 Admin Ct, Chicago, IL, 60606",
  },
  {
    email: "faculty@faculty.com",
    password: "$2y$12$5YQUIpndI8hM4vRUBWI96efu6gMsj.EfPNei5TIcMn35PYWJIbDQ.", //admin
    first_name: "Faculty",
    middle_name: "middle",
    last_name: "User",
    phone: "3123123123",
    address: "19909 Faculty Ln, Orland Park, IL, 60467",
  },
  {
    email: "user@user.com",
    password: "$2y$12$5YQUIpndI8hM4vRUBWI96efu6gMsj.EfPNei5TIcMn35PYWJIbDQ.", //admin
    first_name: "John",
    middle_name: "Middle",
    last_name: "Doe",
    phone: "7737737737",
    address: "19909 User Dr, Orland Park, IL, 60467",
  },
];

exports.seed = async (knex) => {
  // condition before inserting
  const results = await knex("d3l_user").select().limit(1);
  if (results.length == 0) {
    // Insert Seeds
    await knex("d3l_user").insert([...seedArray]);
  }

  return;
};
