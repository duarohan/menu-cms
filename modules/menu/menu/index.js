module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Menu'
  },
  fields: {
    add: {
      weekdayStart: {
        type: 'date'
      },
      weekdayEnd: {
        type: 'date'
      },
      days: {
        type: 'array',
        max: 7,
        fields: {
          add: {
            day: {
              type: 'select',
              label: 'Day',
              choices: 'getAvailableDays'
            },
            _breakfast: {
              type: 'relationship',
              label: 'Breakfast',
              withType: 'dish'
            },
            _lunch: {
              type: 'relationship',
              label: 'Lunch',
              withType: 'dish'
            },
            _dinner: {
              type: 'relationship',
              label: 'Dinner',
              withType: 'dish'
            },
            serving: {
              type: 'integer'
            }
          }
        }
      }
    },
    group: {
      plannerDate: {
        label: 'PlannerDate',
        fields: [ 'weekdayStart', 'weekdayEnd' ]
      },
      days: {
        label: 'Days',
        fields: [ 'days' ]
      }
    }
  },
  columns: {
    // 👇 Adds a column showing when the article was published.
    add: {
      lastPublishedAt: {
        label: 'Published',
        component: 'AposCellDate'
      },
      visibility: {
        label: 'Visibility',
        component: 'AposCellBasic'
      },
      updatedBy: {
        label: 'updated By',
        component: 'updatedByCell'
      }
    }
  },
  filters: {
    add: {
      // publishedThisDay: true,
      // publishedYesterday: true
    }
  },
  methods(self) {
    return {
      getAvailableDays(req, { docId }) {
        const days = [
          {
            label: 'Monday',
            value: 'monday',
            disabled: false
          },
          {
            label: 'Tuesday',
            value: 'tuesday',
            disabled: false
          },
          {
            label: 'Wednesday',
            value: 'wednesday',
            disabled: false
          },
          {
            label: 'Thursday',
            value: 'thursday',
            disabled: false
          },
          {
            label: 'Friday',
            value: 'friday',
            disabled: false
          },
          {
            label: 'Saturday',
            value: 'saturday',
            disabled: false
          },
          {
            label: 'Sunday',
            value: 'sunday',
            disabled: false
          }
        ];
        // selectedDays.forEach((selectedDay) => {
        //   const matchingDay = days.find((day) => day.value === selectedDay.day);
        //   if (matchingDay) {
        //     matchingDay.disabled = true;
        //   }
        // });
        return days;
      }
    };
  },
  queries(self, query) {
    return {
      builders: {

      },
      methods: {
        async publishedThisDay() {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          const criteria = {
            type: 'menu',
            aposMode: 'published',
            lastPublishedAt: {
              $gte: today,
              $lt: tomorrow
            }
          };
          const pipeline = [
            { $match: criteria }
          ];
          const result = await self.apos.doc.db.aggregate(pipeline)
            .toArray();
          console.log(result);
          return result[0];
        },
        async publishedYesterday() {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          const criteria = {
            type: 'menu',
            aposMode: 'published',
            lastPublishedAt: {
              $gte: today,
              $lt: yesterday
            }
          };
          const pipeline = [
            { $match: criteria }
          ];
          const result = await self.apos.doc.db.aggregate(pipeline)
            .toArray();
          console.log(result);
          return result[0];
        }
      }
    };
  }
};
