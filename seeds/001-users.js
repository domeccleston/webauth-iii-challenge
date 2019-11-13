
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Dom', password: "w3irh3wifh", department: 'Web Dev'},
        {id: 2, username: 'Isaac', password: "1128uhied", department: 'Linguistics'},
        {id: 3, username: 'Tom', password: "dn2i3ni2n3i", department: 'International Development'}
      ]);
    });
};
