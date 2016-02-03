class RevenueCapacityCompany extends Directive {
  defineInjections() {
    super.defineInjections();

    this.addInjections(['teamService', 'roleService']);
  }

  link(scope) {
    var data = {};
    this.$q.all([
      this.teamService.get().then((team) => { data.team = team; }),
      this.roleService.get().then((roles) => { data.roles = roles; })
    ]).then(() => {
      var result = {
        min: 0,
        real: 0,
        max: 0
      };

      data.team.forEach((member) => {
        var role = data.roles.find((x) => { return x.id == member.role[0].id; });

        if (role.bill_type == "Points") {
          result.min += role.min_points * role.points_rate * 2;
          result.real += role.points * role.points_rate * 2;
          result.max += role.max_points * role.points_rate * 2;
        }
        else if (role.bill_type == "Hourly") {
          var hourly = role.hourly_fte * role.hourly_rate * 21 * 8;

          result.min += hourly;
          result.real += hourly;
          result.max += hourly;
        }
      });

      scope.result = result;
    });
  }
}

RevenueCapacityCompany.register({
  group: 'projections',

  restrict: 'E',
  replace: true
});
