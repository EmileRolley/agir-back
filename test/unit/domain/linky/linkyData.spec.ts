import {
  LinkyData,
  MonthLinkyData,
  YearMonthLinkyData,
} from '../../../../src/domain/linky/linkyData';

describe('LinkyData', () => {
  it('extractLastNDays : extract last 2 days with proper labels ', () => {
    // GIVEN
    const linkyData = new LinkyData({
      prm: 'abc',
      serie: [
        {
          time: new Date('2021-12-21T12:00:00.000Z'),
          value: 0,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2021-12-22T12:00:00.000Z'),
          value: 0,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2021-12-23T12:00:00.000Z'),
          value: 0,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2021-12-24T12:00:00.000Z'),
          value: 0,
          value_at_normal_temperature: 1,
        },
      ],
    });

    // WHEN
    const result = linkyData.extractLastNDays(2);

    // THEN
    expect(result).toHaveLength(2);
    expect(result[0].jour).toEqual('jeudi');
    expect(result[1].jour).toEqual('vendredi');
  });
  it('extractLastNDays : extract last 2 days with proper labels ', () => {
    // GIVEN
    const linkyData = new LinkyData({
      prm: 'abc',
      serie: [],
    });
    const current_date = new Date('2021-12-01T12:00:00.000Z');
    for (let index = 1; index < 31; index++) {
      current_date.setDate(index);
      linkyData.serie.push({
        time: new Date(current_date.getTime()),
        value: index,
        value_at_normal_temperature: index * 10,
      });
    }

    // WHEN
    const result = linkyData.extractLastNWeeks(2);

    // THEN
    expect(result).toHaveLength(2);
    expect(result[0].value).toEqual(140);
    expect(result[0].value_at_normal_temperature).toEqual(1400);
    expect(result[1].value).toEqual(189);
    expect(result[1].value_at_normal_temperature).toEqual(1890);
  });
  it('fillRequiredYearMonthsData : extract nothing if no data ', () => {
    // GIVEN
    const linkyData = new LinkyData({
      prm: 'abc',
      serie: [],
    });

    const input = new YearMonthLinkyData();
    input.years.set(2024, new MonthLinkyData());
    input.years.get(2024).months.set(1, []);

    // WHEN
    linkyData.fillRequiredYearMonthsData(input);

    // THEN
    expect(input.years.get(2024).months.get(1)).toHaveLength(0);
  });
  it('fillRequiredYearMonthsData : extract proper date ', () => {
    // GIVEN
    const linkyData = new LinkyData({
      prm: 'abc',
      serie: [
        {
          time: new Date('2021-12-21T12:00:00.000Z'),
          value: 11,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2021-11-05T12:00:00.000Z'),
          value: 22,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-01-10T12:00:00.000Z'),
          value: 33,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-02-23T12:00:00.000Z'),
          value: 44,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-03-24T12:00:00.000Z'),
          value: 55,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-03-25T12:00:00.000Z'),
          value: 66,
          value_at_normal_temperature: 1,
        },
      ],
    });

    const input = new YearMonthLinkyData();

    input.years.set(2021, new MonthLinkyData());
    input.years.get(2021).months.set(10, []);

    input.years.set(2022, new MonthLinkyData());
    input.years.get(2022).months.set(0, []);
    input.years.get(2022).months.set(2, []);

    // WHEN
    linkyData.fillRequiredYearMonthsData(input);

    // THEN
    expect(input.years.size).toEqual(2);
    expect(input.years.get(2021).months.get(10)).toHaveLength(1);
    expect(input.years.get(2021).months.get(10)[0].value).toEqual(22);

    expect(input.years.get(2022).months.get(0)).toHaveLength(1);
    expect(input.years.get(2022).months.get(0)[0].value).toEqual(33);

    expect(input.years.get(2022).months.get(2)).toHaveLength(2);
    expect(input.years.get(2022).months.get(2)[0].value).toEqual(55);
    expect(input.years.get(2022).months.get(2)[1].value).toEqual(66);
  });
  it('extractLastNMonths : extract proper data for 3 last months ', () => {
    // GIVEN
    const linkyData = new LinkyData({
      prm: 'abc',
      serie: [
        {
          time: new Date('2021-12-21T12:00:00.000Z'),
          value: 11,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2021-11-05T12:00:00.000Z'),
          value: 22,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-01-10T12:00:00.000Z'),
          value: 33,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-02-23T12:00:00.000Z'),
          value: 44,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-03-24T12:00:00.000Z'),
          value: 55,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-03-25T12:00:00.000Z'),
          value: 66,
          value_at_normal_temperature: 1,
        },
      ],
    });

    // WHEN
    const result = linkyData.extractLastNMonths(
      4,
      new Date('2022-03-28T12:00:00.000Z'),
    );

    // THEN
    expect(result).toHaveLength(4);

    expect(result[0].mois).toEqual('décembre');
    expect(result[1].mois).toEqual('janvier');
    expect(result[2].mois).toEqual('février');
    expect(result[3].mois).toEqual('mars');

    expect(result[0].annee).toEqual('2021');
    expect(result[1].annee).toEqual('2022');
    expect(result[2].annee).toEqual('2022');
    expect(result[3].annee).toEqual('2022');

    expect(result[0].value).toEqual(11);
    expect(result[1].value).toEqual(33);
    expect(result[2].value).toEqual(44);
    expect(result[3].value).toEqual(121);
    expect(result[3].value_at_normal_temperature).toEqual(2);
  });
  it('extractLastNMonths : handles ok empty months ', () => {
    // GIVEN
    const linkyData = new LinkyData({
      prm: 'abc',
      serie: [
        {
          time: new Date('2021-12-21T12:00:00.000Z'),
          value: 11,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2021-11-05T12:00:00.000Z'),
          value: 22,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-01-10T12:00:00.000Z'),
          value: 33,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-03-24T12:00:00.000Z'),
          value: 55,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-03-25T12:00:00.000Z'),
          value: 66,
          value_at_normal_temperature: 1,
        },
      ],
    });

    // WHEN
    const result = linkyData.extractLastNMonths(
      4,
      new Date('2022-04-28T12:00:00.000Z'),
    );

    // THEN
    expect(result).toHaveLength(4);

    expect(result[0].mois).toEqual('janvier');
    expect(result[1].mois).toEqual('février');
    expect(result[2].mois).toEqual('mars');
    expect(result[3].mois).toEqual('avril');

    expect(result[0].annee).toEqual('2022');
    expect(result[1].annee).toEqual('2022');
    expect(result[2].annee).toEqual('2022');
    expect(result[3].annee).toEqual('2022');

    expect(result[0].value).toEqual(33);
    expect(result[1].value).toEqual(0);
    expect(result[2].value).toEqual(121);
    expect(result[3].value).toEqual(0);
  });
  it('listMonthsFromDate : list months backward from date ', () => {
    // GIVEN

    // WHEN
    const result = LinkyData.listMonthsFromDate(
      4,
      new Date('2022-03-24T12:00:00.000Z'),
    );

    // THEN
    expect(result.years.size).toEqual(2);
    expect(result.years.get(2022).months.size).toEqual(3);
    expect(result.years.get(2022).months.get(0)).toEqual([]);
    expect(result.years.get(2022).months.get(1)).toEqual([]);
    expect(result.years.get(2022).months.get(2)).toEqual([]);
    expect(result.years.get(2021).months.size).toEqual(1);
    expect(result.years.get(2021).months.get(11)).toEqual([]);
  });
  it('cleanData : order inner serie by descending dates ', () => {
    // GIVEN
    const linkyData = new LinkyData({
      prm: 'abc',
      serie: [
        {
          time: new Date('2022-03-24T12:00:00.000Z'),
          value: 33,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-01-10T12:00:00.000Z'),
          value: 11,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-02-25T12:00:00.000Z'),
          value: 22,
          value_at_normal_temperature: 1,
        },
      ],
    });

    // WHEN
    linkyData.cleanData();

    // THEN
    expect(linkyData.serie[0].value).toEqual(11);
    expect(linkyData.serie[1].value).toEqual(22);
    expect(linkyData.serie[2].value).toEqual(33);
  });
  it('cleanData : supprime les doublons de date par un parcours gauche droite ddes série (réception ancienne vers nouvelles)', () => {
    // GIVEN
    const linkyData = new LinkyData({
      prm: 'abc',
      serie: [
        {
          time: new Date('2022-01-10T12:00:00.000Z'),
          value: 11,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-03-24T12:00:00.000Z'),
          value: 33,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-01-10T12:00:00.000Z'),
          value: 12,
          value_at_normal_temperature: 1,
        },
        {
          time: new Date('2022-03-24T12:00:00.000Z'),
          value: 34,
          value_at_normal_temperature: 1,
        },
      ],
    });

    // WHEN
    linkyData.cleanData();

    // THEN
    expect(linkyData.serie).toHaveLength(2);
    expect(linkyData.serie[0].value).toEqual(12);
    expect(linkyData.serie[1].value).toEqual(34);
  });
  it('compare2AnsParMois : extait correctement 24 mois', () => {
    // GIVEN
    const linkyData = new LinkyData({
      prm: 'abc',
      serie: [
        {
          time: new Date('2000-01-01T12:00:00.000Z'),
          value: 1,
          value_at_normal_temperature: 10,
        },
        {
          time: new Date('2000-02-01T12:00:00.000Z'),
          value: 2,
          value_at_normal_temperature: 20,
        },
        {
          time: new Date('2000-03-01T12:00:00.000Z'),
          value: 3,
          value_at_normal_temperature: 30,
        },
        {
          time: new Date('2000-04-01T12:00:00.000Z'),
          value: 4,
          value_at_normal_temperature: 40,
        },
        {
          time: new Date('2000-05-01T12:00:00.000Z'),
          value: 5,
          value_at_normal_temperature: 50,
        },
        {
          time: new Date('2000-06-01T12:00:00.000Z'),
          value: 6,
          value_at_normal_temperature: 60,
        },
        {
          time: new Date('2000-07-01T12:00:00.000Z'),
          value: 7,
          value_at_normal_temperature: 70,
        },
        {
          time: new Date('2000-08-01T12:00:00.000Z'),
          value: 8,
          value_at_normal_temperature: 80,
        },
        {
          time: new Date('2000-09-01T12:00:00.000Z'),
          value: 9,
          value_at_normal_temperature: 90,
        },
        {
          time: new Date('2000-10-01T12:00:00.000Z'),
          value: 10,
          value_at_normal_temperature: 100,
        },
        {
          time: new Date('2000-11-01T12:00:00.000Z'),
          value: 11,
          value_at_normal_temperature: 110,
        },
        {
          time: new Date('2000-12-01T12:00:00.000Z'),
          value: 12,
          value_at_normal_temperature: 120,
        },
        {
          time: new Date('2000-12-02T12:00:00.000Z'),
          value: 13,
          value_at_normal_temperature: 130,
        },
        //############################################
        {
          time: new Date('2001-01-01T12:00:00.000Z'),
          value: 10,
          value_at_normal_temperature: 100,
        },
        {
          time: new Date('2001-02-01T12:00:00.000Z'),
          value: 20,
          value_at_normal_temperature: 200,
        },
        {
          time: new Date('2001-03-01T12:00:00.000Z'),
          value: 30,
          value_at_normal_temperature: 300,
        },
        {
          time: new Date('2001-04-01T12:00:00.000Z'),
          value: 40,
          value_at_normal_temperature: 400,
        },
        {
          time: new Date('2001-05-01T12:00:00.000Z'),
          value: 50,
          value_at_normal_temperature: 500,
        },
        {
          time: new Date('2001-06-01T12:00:00.000Z'),
          value: 60,
          value_at_normal_temperature: 600,
        },
        {
          time: new Date('2001-07-01T12:00:00.000Z'),
          value: 70,
          value_at_normal_temperature: 700,
        },
        {
          time: new Date('2001-08-01T12:00:00.000Z'),
          value: 80,
          value_at_normal_temperature: 800,
        },
        {
          time: new Date('2001-09-01T12:00:00.000Z'),
          value: 90,
          value_at_normal_temperature: 900,
        },
        {
          time: new Date('2001-10-01T12:00:00.000Z'),
          value: 100,
          value_at_normal_temperature: 1000,
        },
        {
          time: new Date('2001-11-01T12:00:00.000Z'),
          value: 110,
          value_at_normal_temperature: 1100,
        },
        {
          time: new Date('2001-12-01T12:00:00.000Z'),
          value: 120,
          value_at_normal_temperature: 1200,
        },
        {
          time: new Date('2001-12-02T12:00:00.000Z'),
          value: 130,
          value_at_normal_temperature: 1300,
        },
      ],
    });

    // WHEN
    const result = linkyData.compare2AnsParMois();

    // THEN
    expect(result).toHaveLength(24);
    expect(result[0].value).toEqual(1);
    expect(result[1].value).toEqual(10);
    expect(result[2].value).toEqual(2);
    expect(result[3].value).toEqual(20);
    expect(result[4].value).toEqual(3);
    expect(result[5].value).toEqual(30);
  });
});
