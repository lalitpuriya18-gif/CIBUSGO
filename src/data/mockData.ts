import type { Restaurant, MenuItem, Coupon, Address, PaymentMethod, Order, Testimonial } from '../types/index.ts';

export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuATkOhLtlpvkIwgTgCvYYNJhctxnvkMLCXoesm0Wcn8icNAG5IRUTF6Lv4MixA6ZYsXyXTdsSaKsjlPDvlG1_RKRNgoZSJf3m1y4ds6MBVZm4qwBvVj4wJH0E4nGLXWSOndh4oV_n8bzShbGzeoyGxqedVdl9cfXDDTK7ivgypVhFlAV29DUPssJuHOzNnnNsFqBgmfQA-HNOQRAv6JlDOSI4t02zEYlr1Sd0jbZYz_uT5rKOQQKcsHNQ';

export const USER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCZH4BSgtrOAAAljiVyMFyLyGwhzQNrUqTFJ7KbS_96y5S9ketYmC3-RZA3pLSlr6j6KNUTZqpNKImMNuWtmSpOpKI2YZ7AX_0jEACj7WpS0GHwUFTLc4zgcw_iku974G7SowbpPBvnBrY8yM87n8YkEooTNlwor4sWKJk_Q__87RlpR-o2D6804nCjkpRvFexCCewiREOxeltQRJXPHnSDRKM9p4nX9VSEYF-y4FyMrsKxD3Zee6HXuA';

export const USER_PROFILE_HERO_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD15DTYKnfqIDjK2FIBitsiQqhyDp_53V5OgNzP4fvigQxNV4TZn6SA6NXS3Dtr6Wq7k38oOByEvspDdKASQuiCo12AE9y758SlTkSdM_6hMH7buKSoqIy0rr0oqLx4-36z5C32V1QgWO9NYZD3tKUZ2lrOuYl8zQvlJqsyP42GCuP-c372tbURUU0gpWr7Pevx3Jf01vPGuRkAicSuUvHRrcifp0kWQblGKGpaSIOfumEl4fShNCA0yQ';

export const MAP_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA-2c4VqLi4ZC9BJDYjBTP15i-O-nKufYS9oPs7Fcr9HXWMbZCsMsTo3X4FPrOS-opE_tA7JktK5odBd3BI-vqDrtOCsw1Nex_bKM4iH4ElqYS1QY0VBCb_hD_WHjolpLPujO3W2fe32sIo_lVBfhPa8zGZ9lEhEeGA616vwgzgFtqbKyoXvsKr8SzMQTJeKJz7pyM9vdFMiqmlWakKs_m428B7xlinDf_2Ltp1dibl1KTV6eEgxfOwYg';

export const DRIVER_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAO2rehtrj7iFRDFOHdX6rlQ2UtDtKTImOFeF_8tODhPTWoysHWzm_jK9JbSBgI8g5S3oJAiamhtoCOsyCGhtRQAiAKQG7nobGPkvfsx0UIzHtaVKlH_Ymk2ZuxGNuTCdA7LhPPAWgdHN9AOGiO2ghRnkB8yIkoHIS8eHHotq8vpGtu3ATqTULy5BeGcHMB9rdn3zBIp94bonEMMjgBNNKc6FsQnJucXtFrBKZo60g0lVnICsSF5oYGnA';

export const HERO_COLLAGE = {
  burger:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBH6wfCDCSoI1hl-zYBkqzZfs7yLPvKCCQLKv7Tnrg-PMrS4OUtp-9NoIWQvmSxId6vxR5CGQJqgdaU5fU-GwTSSWO1ti7KsdIUsuL_q8Nv9DROY_MQLFkhPDmPA_ZmwJj5hmUrozu-7k6BxHOgm-8UBaQ0wU-n0ltOf4Zr5a_oh7m0iiNttwZua-hbRrbDlJt0-CT3e5TDClDV0TJiKMF6NfygCcIRl6fngJC2poICL6EGvHK_wwX5gQ',
  biryani:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDNcU18F3wD891eGOtL_-MqCxHMN_343QxSJmz_hYX8sAhpIM6VAukrM0lRtR6jRgf7zYVDMPdW-X4S3Tze0Pew1olRtMKDDHAH0eIb5ObVqXvlcL5RugYVJgXICr968O6QJMymmYhZaA8Uns4nKI6EF-CN_go7sSD7pCrALmDwno4v5Jg1-DbZou6tvrjZzJyxWHQrKBRCCJd7SE-B5Om4E6yocR1qHEe9Sh4MflnrXr9LF2W2s3VnqA',
  pizza:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAYkQqTZ0AigiF0gLEmsdsvfSCoQkopPP9aqij_Zg1eIAeWbeEhuUzqcA9ZSllymfWduT7tsbjPfy5JAiNvrxX2Z6CsM93qID-VsCYCosm8SBQhcHSMfKP2daVfIfLC4XeUQRcME7WBxemyZL-tOMBhDqjYOPYc13Ip8kSJrtgovgIlTue0dmg_eTHWlgIbXhGCH7HH-KyzAziriZyMPIggYntwgnRr5CGitAzZs4ufYYXcRUe-JJHxfQ',
  desserts:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCpdjmK-q-q0vnlgvsTCw0gY9MDIBc4aMRPKtFtPn5VCQkTJ-1FLaA4EDdzpW3rGQ6hxpAVBFfAoJ8U5W_siRoNVST-RZE66HymR6Ktn6d1zSjD36fM4ouTrQKcfTAuPk4tWY_SmtmWcTp9_AgUlYCif3L5nbpm22CVkDTQgy081NVwzD11wtHEpsVTYzzhaCu0ANCa8fEPNl5mpgKGxX445w3zqTfEzrGkCeJ8Bscmiqt6lwgalEsx1g',
};

export const CUISINES = [
  {
    id: 'pizza',
    name: 'Pizza',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5-mO8zY1iOX-_a9MFRbM3OkAm6fpmMUhNHsHuNJw88WB0rIofO2byG09egwRY3KSkT-gOctfwXGCHRwtbVE2Gxc0jaBkyNuuCivfHIh9o2y1-UhI-zu9JTSq4VobP-YjNnW1lxVLHgQYtgfZHR00glwwF9TH3abtnI02qAFg2Path3T0WBS2O8EzIFu_JksyJrwB_rhtTZtnojJg_iVjGhahOORFWsazF2XHyw_hIxuH0CkxiLNA1BQ',
  },
  {
    id: 'burgers',
    name: 'Burgers',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1bvag6Inalb31YcErYyCWgsqVOE1Ytb5qov0p5Lj7xQWUh5ZR5xnHp9n6Ywl0vD5NKV6DihwniIRvZYqj4hZaFddcMtB7zuvT7_9-P1OcgzIYrZX8Bhx8ObeOt09gaTd-XGmjM8muGfVb2wzGYEXSBTt9BjG_ZRHnQITJyaCsj7Fk67p7_6rb1nwlRCBP1o6_X2TyqiSk5DsMAuR5wWd0q-jsiNeGdoafZEJ1Q9CCNYe1xhBEIkcMVQ',
  },
  {
    id: 'biryani',
    name: 'Biryani',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgSRXN9o9vaSxk-hSOuYiE1OWoEbf6nDO21dMj-tKEPYV-AFdvMxd3lCQZ_XmDNuAl0iIAbecU4PEhd6VL_JEYzSzPKIzNPm0iSBKSAgmD4bZk2VvYb_Q62TUcsfaYFIuk0gZUFHyN_gYEy9lceO_A7zbditWGS_ZiTN3QEVB7NZx66Dbs5OcholZulD1D_5XVDLqnqU3fyi4jtZsPtdyi7h_ERDa2TlRZ_TsfiBvxp1mCt5N3wGPVVA',
  },
  {
    id: 'chinese',
    name: 'Chinese',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNqLKnosZRaH-R4K4tjN2G5N4gW9GvxpsAUYLVAuVQAcT9BEsPM_eqWKibH9l29jpQiT-YKxDy1s_OEAlfY_buu8iOc3vFXnhMLGyjx1fqa_JreJOMWJlgLHCZqkmFdnpEXKUY3__TchzxTijMXbzzpDrzcFX__M1AXaTh0KCqCfihcwwyej4gNdpZND8Ed5ocPlGwHT_eoOrM6_yuXAmq3qAxFE1xuOYykFTFvCR0XAWGaIBf_XkM7Q',
  },
  {
    id: 'south-indian',
    name: 'South Indian',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQvA-2JLEv6Zc2KGQ4uSi5sQHqc59kOBxZksnYIcglTP43xBbXGEuhosMCz-zHU-vfplVSdE6vpcbVfeb0VDJ7SFqTPm7Vj-l-esB1tGE2h3V4vSYcCArs96vtfthGErs694zdXYCHPlISBS0qP_RerQVqZSMqEdxuQOsg7h_le9bglYgrJ7HkHHz9oiddFxHKWhoCkTPrMTopUWu6Jgva8bthDSwRpLrlFYd_ETsa1MD2gRmKQkjDag',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDhYqaJQcfKDOXRsysbmikLYJVwA6VS1BrMtSJJeHj2sIWgLCmxwQ_axq22Mao4CwKAOfm5DbOSmsw-vh2gP36D_eg8M5gu-TF4MlhtmrSgggv2OmJB0rZ568QLpT71ntlGTVQhg5T_vvGM68H320elYIScJx1ixh8vGS66ai0yQUqh5ELB8GauNATwhi0ABjvjsBoo4tS4fo_wfbFtSfLE9FFyygG9c09wUv9aVviXi5pDsFgwEIz2PQ',
  },
  {
    id: 'beverages',
    name: 'Beverages',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWi34V7mT9_-u5OkahR_yU4svloqEDZi0zTjf3bZp-BOYx8FWMLBGO7XPAMJOkQE4bABHGG0c9DhhGSV5EA_TyAdWEKDQFQbzn0Si6ARRDxwyDoblm2oNWk6qmh1ivbZpPmRKbtIS438PDw9auuolfYWsy5mpf7gjoRRJOAersxjjepqDosgyK_DrWEx267rWJ5SIPcvnW1Icr0gDtNYXN5ydPIvsesRXvVvqZ7j3m12V9DHVN7z_yyQ',
  },
];

export const BURGER_CO_MENU: MenuItem[] = [
  {
    id: 'bc-1',
    name: 'The Truffle Master',
    price: 14.5,
    description: 'Angus beef patty, black truffle mayo, aged white cheddar, crispy shallots, brioche bun.',
    category: 'Recommended',
    popularTag: 'Bestseller',
    restaurantId: 'burger-co',
    restaurantName: 'Burger & Co. Artisan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKqGxDhlX5qrNrInXASmeqSTMUG-xZn4OJTqL6E3f71qDhrA_ax22gmAf9KfAg-z5A-wydjfLl7wGQfaGqSHPnq8x8qCKNo0JiWDIfQVuUuLE6PhoXBMB9RH2HDwCYn4QBGys4-nOfzLRqaaRBSb8RlpL-td9Iv0J3ckoBAYTwI6docBXzVmSaiMhx1ja7gU7I9CnpLdQs6TYkAwECBIWCsjZ0BcSZKUcJea4yLECzQSvFtYscXetRag',
  },
  {
    id: 'bc-2',
    name: 'Smokey BBQ Bacon Crunch',
    price: 16.0,
    description: 'Double smashed patties, applewood smoked bacon, hickory BBQ sauce, onion rings, cheddar.',
    category: 'Recommended',
    popularTag: "Chef's Choice",
    restaurantId: 'burger-co',
    restaurantName: 'Burger & Co. Artisan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrZ7yf5Ydahdk9vEBiLIHqEF98N6Gq2ZaxmjX32P_V1sJPkwTymRxf6JIacAYwLp6Gh_i6kjLTWkbMGChxHIOeuKD1W6YdQnIomV81kRORYEHX_lJotUP_AFcDSmVDPbJqfQdlNTzdR3SZuVbu252oL33nqzpKhZJ0-YMDC1l27oEEg9Z5BX9pqpUfxTb4dmMauwxQ3fFMTp-5diiiIJp09kQUFefroMSwPrktgeNDrjBaTWIEn0Bc5g',
  },
  {
    id: 'bc-3',
    name: 'Classic Artisan Cheeseburger',
    price: 11.5,
    description: 'Grass-fed beef, American cheese, crisp lettuce, vine tomato, house special secret sauce.',
    category: 'Signature Burgers',
    popularTag: 'Popular',
    restaurantId: 'burger-co',
    restaurantName: 'Burger & Co. Artisan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBH6wfCDCSoI1hl-zYBkqzZfs7yLPvKCCQLKv7Tnrg-PMrS4OUtp-9NoIWQvmSxId6vxR5CGQJqgdaU5fU-GwTSSWO1ti7KsdIUsuL_q8Nv9DROY_MQLFkhPDmPA_ZmwJj5hmUrozu-7k6BxHOgm-8UBaQ0wU-n0ltOf4Zr5a_oh7m0iiNttwZua-hbRrbDlJt0-CT3e5TDClDV0TJiKMF6NfygCcIRl6fngJC2poICL6EGvHK_wwX5gQ',
  },
  {
    id: 'bc-4',
    name: 'The Inferno Jalapeno',
    price: 13.0,
    description: 'Angus beef, fire-roasted jalapeños, pepper jack cheese, spicy habanero aioli.',
    category: 'Signature Burgers',
    popularTag: 'Spicy',
    restaurantId: 'burger-co',
    restaurantName: 'Burger & Co. Artisan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcRuWwHEkBWB3pEAF2oUsoJFjecq3T2whJeDCtrExE4fOSMa2FihOWwhzQ4jy0fh6_JdwDsXDZ0TQhFo9lVbJpJqG3hpL9bcAQmpT_5ccbhgzCgJQLfh8prhIHh0o-TgciJ6jnITTplAUvAZP69LIk_pdpQFEljuhNOboJhc_7YCSQHBlhC8Cyalq0jdKYcwHZ7wN64IUWAoP98mV6lHFKSYlVYt0Zy44U6OINNmtsGFKa41s7e1FOgA',
  },
  {
    id: 'bc-5',
    name: 'Truffle Parmesan Fries',
    price: 6.5,
    description: 'Hand-cut russet potatoes tossed in truffle oil, aged parmesan, fresh parsley.',
    category: 'Crispy Fries',
    popularTag: 'Staff Pick',
    restaurantId: 'burger-co',
    restaurantName: 'Burger & Co. Artisan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDncCuL33ZxqacQ7sjWlWF4yUMXXuyerprlDTlgUNs3TU1YSM-0JzdBDygUNfkLmEh5W1puho0M5BNAsChj4LeaHF2A8tRpmaXa1_6-fnD1VoxLI_ptVNUzZjl56QBQ2JWZmr4mM6bkUwWQ-MP5hkjIefZTSxrqLcoofiJUJcUQtcEf5NvSL9SAb_MAdvuTFLZR9f_mATdehqxY05dmtWRamFmOnAQW3vyI6vWJn4H1zG0-DoVNoRGrTg',
  },
  {
    id: 'bc-6',
    name: 'Loaded Bacon Cheese Fries',
    price: 7.5,
    description: 'Crispy shoestring fries drenched in warm melted cheddar cheese and smoky bacon bits.',
    category: 'Crispy Fries',
    popularTag: 'Indulgent',
    restaurantId: 'burger-co',
    restaurantName: 'Burger & Co. Artisan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDncCuL33ZxqacQ7sjWlWF4yUMXXuyerprlDTlgUNs3TU1YSM-0JzdBDygUNfkLmEh5W1puho0M5BNAsChj4LeaHF2A8tRpmaXa1_6-fnD1VoxLI_ptVNUzZjl56QBQ2JWZmr4mM6bkUwWQ-MP5hkjIefZTSxrqLcoofiJUJcUQtcEf5NvSL9SAb_MAdvuTFLZR9f_mATdehqxY05dmtWRamFmOnAQW3vyI6vWJn4H1zG0-DoVNoRGrTg',
  },
  {
    id: 'bc-7',
    name: 'Artisanal Craft Soda',
    price: 4.5,
    description: 'Organic cane cola, blood orange soda, or vintage cream soda with real vanilla bean.',
    category: 'Artisanal Drinks',
    popularTag: 'Craft',
    restaurantId: 'burger-co',
    restaurantName: 'Burger & Co. Artisan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAapZ-3q3NEUePvld41sRR1YORuWREofma0kNbamUsoDrI52crybhGSQbTiiapowgNRa5vnIf1toIvLazNsdtpdpMTFFG9E1lj4honz3UQvwExU4XIB4R5evUPSeinntj754VmbgNY3pW4OJmbepBZRq-9LssQ0XCxPwPxisMD9IQvqhv8gKtsAacWM7Q0bcgYzCAZOg2pmRKStqeGQDPOdLoH2fgQq2yqz-LUM9DpJa-dW8PnZP9XvUQ',
  },
  {
    id: 'bc-8',
    name: 'Molten Chocolate Brownie Sundae',
    price: 7.99,
    description: 'Warm fudge brownie topped with Madagascar vanilla bean ice cream and salted caramel drizzle.',
    category: 'Desserts',
    popularTag: 'Sweet',
    restaurantId: 'burger-co',
    restaurantName: 'Burger & Co. Artisan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtkmbLRFytK1jUNqvdpesBKOeBlxvhwJ1OB0VMCWim59eH6sASoZeT7luqAGFjoN3glH3w8oLafYynKbv8UFc_za8FTwWHwc1Tbzjd8tQfKCnDoz3ur6uAiwfmhFcANNta4FYpxSRwmpMCaTFn83g-8DGmr7Q8ywSPV5STZRZAW6MAoOhyyQ7eQhF1YL-6lkWNj9U0zWoKiwf7XobZtTk9slOKqxpzVS8R_HBStTgWyVOJrBUEyloXQA',
  },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'burger-co',
    name: 'Burger & Co. Artisan',
    cuisines: ['American', 'Burgers', 'Fast Food'],
    rating: 4.8,
    ratingCount: 1420,
    deliveryTime: '20-25 mins',
    deliveryTimeMins: 22,
    distance: '1.8 km',
    distanceKm: 1.8,
    deliveryFee: 0,
    priceLevel: '$$',
    discountTag: '50% OFF up to $50',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTYeH39zsgLEiz78UQgeXjyViG-s3i_slunUuD-bxwzi-ezKMlxdloMyyJwr_eEOAij9xx7-UdFyJRe4TjkgOeUKaFY2iHR1JwMUMuCH4EXTl4XrCIWyrX4pIiy9RCx69l5Gtwht_Hem8kUvTaBzVJMmKtmSARcFw1MXzrBwQSHdDtTCvczU07cGDEFjPD7Eqf04NaGbr2e29s9l7fhLXujXHvCqc9V1G8AnRLSZ2zmYAJ59FHz_sehA',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcRuWwHEkBWB3pEAF2oUsoJFjecq3T2whJeDCtrExE4fOSMa2FihOWwhzQ4jy0fh6_JdwDsXDZ0TQhFo9lVbJpJqG3hpL9bcAQmpT_5ccbhgzCgJQLfh8prhIHh0o-TgciJ6jnITTplAUvAZP69LIk_pdpQFEljuhNOboJhc_7YCSQHBlhC8Cyalq0jdKYcwHZ7wN64IUWAoP98mV6lHFKSYlVYt0Zy44U6OINNmtsGFKa41s7e1FOgA',
    isPureVeg: false,
    popularItemName: 'Truffle Bacon Burger',
    popularItemPrice: 14.5,
    menu: BURGER_CO_MENU,
    address: '422 West 23rd St, Manhattan, NY',
    closingTime: '11:00 PM',
  },
  {
    id: 'trattoria-bella',
    name: 'Trattoria Bella Napoli',
    cuisines: ['Italian', 'Pizza', 'Pasta', 'Desserts'],
    rating: 4.8,
    ratingCount: 980,
    deliveryTime: '25-30 mins',
    deliveryTimeMins: 27,
    distance: '2.4 km',
    distanceKm: 2.4,
    deliveryFee: 0,
    priceLevel: '$$$',
    discountTag: '20% OFF up to $50',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDfN5VnvUkLMwm66dHdmj-vM94k_AjPdNE8-5TGy996ZvoPDEwj4H_jfNe1Pw5z8fH0lU-9fkUIHQdQp-hH89gTnF8F_6nx39OFiQEkEtDlD9ioRcSPn15zhGOdBCZUcuCeowA_BCifFr40zmfiy92HrBFD_H5gwq1Lr3EMzYojVZw77rmuS7HooFX0xkIIjCqMWnKvjzgV8FXDbj0dampN0hoJ7_1N6iowJLpgxj0X1Z2wiEmA8ucHA',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRWAJhZiI8EHfZ3erYTQzKWf6mGGfN5rZ8ZSuVLNam2ScUHpKR9QXQHwlcRDzb9xRH_crSQdx6qAakO8WUdcrEEB8foVtd4aevPwpyjUKVampjDRmJo8YMoF_bW8KY9ZP7RQ-RlwNi-_w2PUxPuUX7uS1jb73xaAK118_9eBFaMojvVRPha_zfotHjESnuxTVcSfADFNnJG6d1K3qqNI815vZIld0NJVLa9L1sGDsI7VERH8ZsbkZN4A',
    isPureVeg: false,
    popularItemName: 'Truffle Margherita Pizza',
    popularItemPrice: 18.5,
    menu: [
      {
        id: 'tb-1',
        name: 'Truffle Margherita Pizza',
        price: 18.5,
        description: 'San Marzano tomatoes, fresh buffalo mozzarella, shaved black summer truffle, basil, EVOO.',
        category: 'Pizza',
        popularTag: 'Best Seller',
        restaurantId: 'trattoria-bella',
        restaurantName: 'Trattoria Bella Napoli',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAvOEVS8V-eyD9Wl4Kie57C4p9cWoTQFJvWAm_I5zC4T-dxMaXjPj0ir-gAt4HuoD-kb6p1HoGQNocKlRyvGtK0mgBselQ-mUHNrSh8ULx76DX54jRsKaDvO5GEl54weUZJNg2Mt5IgIJ7B74_YU0aPu57-R3XijyMJ22ZYAnE3Mcu-UCqQMX6_jx-6g0sR98OXn-mWw46mefQeDMec8QByRnFVJ4IBLj7odkSJGO9aFf-UGMTRQd61Cw',
      },
      {
        id: 'tb-2',
        name: 'Classic Pepperoni Rustica',
        price: 17.0,
        description: 'Crispy artisanal pepperoni cups, hot honey drizzle, aged pecorino, fresh oregano.',
        category: 'Pizza',
        popularTag: 'Popular',
        restaurantId: 'trattoria-bella',
        restaurantName: 'Trattoria Bella Napoli',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAYkQqTZ0AigiF0gLEmsdsvfSCoQkopPP9aqij_Zg1eIAeWbeEhuUzqcA9ZSllymfWduT7tsbjPfy5JAiNvrxX2Z6CsM93qID-VsCYCosm8SBQhcHSMfKP2daVfIfLC4XeUQRcME7WBxemyZL-tOMBhDqjYOPYc13Ip8kSJrtgovgIlTue0dmg_eTHWlgIbXhGCH7HH-KyzAziriZyMPIggYntwgnRr5CGitAzZs4ufYYXcRUe-JJHxfQ',
      },
      {
        id: 'tb-3',
        name: 'Handmade Tiramisu Tradizionale',
        price: 8.5,
        description: 'Espresso-soaked savoiardi, silky mascarpone cream, Dutch cocoa powder.',
        category: 'Desserts',
        popularTag: 'Dessert Favorite',
        restaurantId: 'trattoria-bella',
        restaurantName: 'Trattoria Bella Napoli',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDhYqaJQcfKDOXRsysbmikLYJVwA6VS1BrMtSJJeHj2sIWgLCmxwQ_axq22Mao4CwKAOfm5DbOSmsw-vh2gP36D_eg8M5gu-TF4MlhtmrSgggv2OmJB0rZ568QLpT71ntlGTVQhg5T_vvGM68H320elYIScJx1ixh8vGS66ai0yQUqh5ELB8GauNATwhi0ABjvjsBoo4tS4fo_wfbFtSfLE9FFyygG9c09wUv9aVviXi5pDsFgwEIz2PQ',
      },
    ],
    address: '154 Prince St, Soho, NY',
    closingTime: '10:30 PM',
  },
  {
    id: 'taj-spice',
    name: 'Taj Spice & Biryani',
    cuisines: ['Indian', 'Biryani', 'Curries', 'Tandoori'],
    rating: 4.9,
    ratingCount: 1640,
    deliveryTime: '30-40 mins',
    deliveryTimeMins: 35,
    distance: '3.1 km',
    distanceKm: 3.1,
    deliveryFee: 0,
    priceLevel: '$$',
    discountTag: 'BOGO Offer',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1scm890MB0N4M2NRsP_BJ2UnC-HILgzilzkB7h_nzF0EEc7jI0E-pbHy_Ooa8Etl2b_hyDbrHq-6RlceqygH7yy40-eo-ph7BahcglIhBEiwcYPj9kYXKTcunYqe1moPedYXkBeIbDMpLaH_5Ns1ObrQYv75McMm5oLRfGuefEZO6_F4Va9gJMpDY0OjfLSMNjpLgDiNC4EG3qHY1y2zx7iZdc2BjtY3wF2L5EBMWpEXkGvXbfczDjw',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNcU18F3wD891eGOtL_-MqCxHMN_343QxSJmz_hYX8sAhpIM6VAukrM0lRtR6jRgf7zYVDMPdW-X4S3Tze0Pew1olRtMKDDHAH0eIb5ObVqXvlcL5RugYVJgXICr968O6QJMymmYhZaA8Uns4nKI6EF-CN_go7sSD7pCrALmDwno4v5Jg1-DbZou6tvrjZzJyxWHQrKBRCCJd7SE-B5Om4E6yocR1qHEe9Sh4MflnrXr9LF2W2s3VnqA',
    isPureVeg: false,
    popularItemName: 'Hyderabadi Dum Biryani',
    popularItemPrice: 16.0,
    menu: [
      {
        id: 'ts-1',
        name: 'Hyderabadi Dum Biryani',
        price: 16.0,
        description: 'Tender marinated chicken slow cooked with fragrant aged basmati rice, saffron, and house spices.',
        category: 'Biryani',
        popularTag: 'Chef Special',
        restaurantId: 'taj-spice',
        restaurantName: 'Taj Spice & Biryani',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCG5AnxKuW5Aunat5OgMU5UNB60iel9pcYpQrgsLig5ezxgV_McZONjtrDukFkCUbFHPwVYRfseZ7VLe0s-ykeiGp7JYowXanESldF5Qscvw--Pd6aTolikfcW2c4yG44pYKaykjKElmouJApVSE-AZL8wIxTq6Agv0QgFUieB_XQdRovMQufV-33bu0EFYXZqeNQ-rer3KTRd0RuLtGlaWAxJ2nxarzQb7xKS_fqdqNlwFOlvCzcemQQ',
      },
    ],
    address: '320 Lexington Ave, New York, NY',
    closingTime: '11:30 PM',
  },
  {
    id: 'tokyo-ramen',
    name: 'Tokyo Ramen House',
    cuisines: ['Japanese', 'Ramen', 'Sushi', 'Asian'],
    rating: 4.7,
    ratingCount: 1120,
    deliveryTime: '20-25 mins',
    deliveryTimeMins: 22,
    distance: '1.5 km',
    distanceKm: 1.5,
    deliveryFee: 1.49,
    priceLevel: '$$$',
    discountTag: '15% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGNnV0B8v72c2DbypaSwitn9UDOJipFHAamwSVCXY8XRZ3o1zP3uEdTeOXKePDWuaYn--CvDS0Ecj6cQfVBwwA4U-Qe1n0DKL-DiirJrfpPNrXk7ZrwY5aTB10pUIJKNWVgABOp7WZTXZd-YR3WGP5V-iT_EDMJQ_9T_EiC7xuxq0HbsAQPGYOpro-_xXiSQbcF6TWvy_P7pPcBzoyG232pzqKKHlP4cNFcp0MH4HfP20Ti2C6pGWTUg',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDs31tUAdzJVMb9ljaxd4J04dtHcfGeZv9xnWPepPrTP1SlUsPfb9muigF9uD1WvweL47YOWAKfWoeLFZ9JugIACGDesqQSmyw9Yk0mCZmnBhNKhBb0K0B62nA2bOIQyzl5PYRzhpP7u_3aZKyhR9al2T4UHHbn-bdih1DnygykeaSBiCSfUKBIrRRzfUXs6P4iUl8pBR_Sg7VMdJPS-4TfsjhOBQSHRZXE49m59wCxwZ_Mn9U9FZmfeQ',
    isPureVeg: false,
    popularItemName: 'Spicy Tonkotsu Ramen',
    popularItemPrice: 15.5,
    menu: [],
    address: '88 E 10th St, East Village, NY',
    closingTime: '11:00 PM',
  },
  {
    id: 'el-toro',
    name: 'El Toro Taqueria',
    cuisines: ['Mexican', 'Tacos', 'Burritos', 'Street Food'],
    rating: 4.5,
    ratingCount: 890,
    deliveryTime: '20-30 mins',
    deliveryTimeMins: 25,
    distance: '2.5 km',
    distanceKm: 2.5,
    deliveryFee: 0,
    priceLevel: '$',
    discountTag: '20% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6wob0pHaQ1m4NGC2xc_bTEbHPpKcQzvRpny4Z8OKjJ-XHcYnPhoz8XtirDNs1Lg4BHNhDB85EvJ4lrHELA23vFVUJkU_r6WHvHdz-sKZ80Nn9uqhdZ1uN5QBP9leJd7De0P_4K0HTLb8mE4QfTw-QQCnR_SOS0sFcBhSVscT7zARSl5r4SuPIuRjuIhMVOaXM79AdA_R9Fm_GtD2IaC7husEROCcF6OGzsn7dd8mpr0KijCUcl7u43A',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoZrx0ShfhPMzzkYxLmSmyiGVk5nUegYmDjTqSE9Ap_XbBhZ-R17QRrXI4CpnS0BYbebKNyBcfQlR43IwoluSoCnnILiORfcQOiQ7zoP-FUujLEu4G1glD8owAV1KSEUaSTKAao1HmKVnrIyBoV3ZPQWB178iSN9gfeNw9H1kMcgL4CdizjK3tDv1CvVtm2MyVbMf48TpGbe1QIf3EV2i83XLL2AerzsnUPCUX10RA7jI8og83b3Qq1g',
    isPureVeg: false,
    popularItemName: 'Carne Asada Tacos (3x)',
    popularItemPrice: 12.0,
    menu: [],
    address: '240 W 14th St, New York, NY',
    closingTime: '12:00 AM',
  },
  {
    id: 'sweet-paris',
    name: 'Sweet Paris Bakery',
    cuisines: ['Bakery', 'Desserts', 'Coffee', 'Pastries'],
    rating: 4.9,
    ratingCount: 750,
    deliveryTime: '15-20 mins',
    deliveryTimeMins: 18,
    distance: '1.2 km',
    distanceKm: 1.2,
    deliveryFee: 1.99,
    priceLevel: '$$',
    discountTag: '$5 OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2oMU4wEAhhjuw8qrmYLBZgL-3rwPRN-mfzQv47MLDklxq1yoKDfXIsxWRv-LMcnhbFRhy8Hoxw74sE6H1JUedkNfJ8FNMfwemdRXeOgeiyNaAY1ztKbAezCqbD9A5ybdd45tBPDuLeXiRD0LolWA7ygvjzRrpAbNSw3QKMborJtEsULweJDQN4HV4qeiAkXj3UYMzPI5Wx7zJsA8jK8WoUFdlJ-RsZurmSZ5egJ1cwuYsY-Um_bWNPw',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2oMU4wEAhhjuw8qrmYLBZgL-3rwPRN-mfzQv47MLDklxq1yoKDfXIsxWRv-LMcnhbFRhy8Hoxw74sE6H1JUedkNfJ8FNMfwemdRXeOgeiyNaAY1ztKbAezCqbD9A5ybdd45tBPDuLeXiRD0LolWA7ygvjzRrpAbNSw3QKMborJtEsULweJDQN4HV4qeiAkXj3UYMzPI5Wx7zJsA8jK8WoUFdlJ-RsZurmSZ5egJ1cwuYsY-Um_bWNPw',
    isPureVeg: true,
    popularItemName: 'Molten Lava Cake',
    popularItemPrice: 8.99,
    menu: [],
    address: '75 Bleecker St, Greenwich Village, NY',
    closingTime: '9:00 PM',
  },
  {
    id: 'sakura-sushi',
    name: 'Sakura Sushi & Roll',
    cuisines: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.7,
    ratingCount: 810,
    deliveryTime: '35-40 mins',
    deliveryTimeMins: 38,
    distance: '4.1 km',
    distanceKm: 4.1,
    deliveryFee: 0,
    priceLevel: '$$$',
    discountTag: '15% OFF Sushi Sets',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWwBm9HEPpceybKddkshAuWM37uTE2vo2NBL64cdSzsve6n_prug3IpkQ4mlEydjjXXytTZScEbevZE3mNQJFGELfxzy3KHQRMU9iWVrtpv_Ef2DvbUzfbVg5EgPhuSF4yWq71cmcBf0kDrkYv2byoiF4CkFIsmJq3KyfU0HlwJ4OmzJLnC5fjl0KyelsOaK_dUZgLYAqHTj2gtHFik_2pjEOwWZ5xhvqAem07GQ7B9Udqj_zpUt5Ng',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4qDZCP73YiuWyVjKLdeKM6nMWvkBsiNHF_klkCFIRVW4FB6E0ckoEVbA-6U6zp0Et2hNNVSGep1pcK_Jddo-xRHR9kZB0C7LYztRVQeIfQO3nE6DCJNRy0HIsOSL4KSwWjkYCToKHEkxDeb17d0RP9Zg4Wu8Z5coFsDXUNbV2ESNe7feTq1laUb7d3upVtYuAfaelcubxkpJkixguYQSd_Hfh9k-LZFPINHqh-wY9CrYD6WTensLQyA',
    isPureVeg: false,
    popularItemName: 'Dragon Roll',
    popularItemPrice: 17.5,
    menu: [],
    address: '512 Columbus Ave, Upper West Side, NY',
    closingTime: '10:00 PM',
  },
  {
    id: 'crispy-bird',
    name: 'Crispy Bird Shack',
    cuisines: ['American', 'Fried Chicken', 'Comfort Food'],
    rating: 4.3,
    ratingCount: 620,
    deliveryTime: '20-25 mins',
    deliveryTimeMins: 23,
    distance: '2.0 km',
    distanceKm: 2.0,
    deliveryFee: 1.49,
    priceLevel: '$$',
    discountTag: '30% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCMnHeT-NfZhQbOePlGgjwbsUOp6lx1dh81ycPhBUqW8mAMJ4hTGtO3f6JFZqa_V81dgXXMOp5JoKtJdbu7r9Y1ZtXURB5Xi9xCwjMRiqdGBO5hjLOWs_zcz0a0MHIZAbY0vhQ0IsP2GFr2fbB9EeMoZQOpo3c9eEFw2R3W92d-neL7QQ8u59fY0NHOeXWNt9PXUvjK5vTWW8vprFZBwobMi5dEMucjCGeRKX-TNPDEZcGG_9DcOQ5GpA',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCMnHeT-NfZhQbOePlGgjwbsUOp6lx1dh81ycPhBUqW8mAMJ4hTGtO3f6JFZqa_V81dgXXMOp5JoKtJdbu7r9Y1ZtXURB5Xi9xCwjMRiqdGBO5hjLOWs_zcz0a0MHIZAbY0vhQ0IsP2GFr2fbB9EeMoZQOpo3c9eEFw2R3W92d-neL7QQ8u59fY0NHOeXWNt9PXUvjK5vTWW8vprFZBwobMi5dEMucjCGeRKX-TNPDEZcGG_9DcOQ5GpA',
    isPureVeg: false,
    popularItemName: '6-pc Wings Bucket',
    popularItemPrice: 13.99,
    menu: [],
    address: '110 8th Ave, Chelsea, NY',
    closingTime: '11:00 PM',
  },
];

export const BESTSELLERS: MenuItem[] = [
  {
    id: 'bs-1',
    name: 'Ultimate Bacon Burger',
    price: 14.99,
    description: 'Double beef patty with smoked hickory bacon and melted cheddar cheese on brioche.',
    category: 'Burgers',
    popularTag: 'Trending #1',
    restaurantId: 'burger-co',
    restaurantName: 'Burger & Co. Artisan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjJkQ5AKCx2FC2_v5TxVeFfgeR3eH4wS_DjYaMg41Rhj5n8lzA_RGQ1bHenm56ifUDx3RWTSCN2D8QVot5i2QbCpnFMVi1qMMZspHkTp0nYiOYWPReqEC_g2Cu9Dc34_zoh6dTH__6qaukM4KjeeKHKp5G1voWmcIWu0_bupq1Ps5vK4aWr5TFLwz9i2QzPM1JJU7T_L5ga2HFgal8SC07jDnwuUVFaxWCbOcQ9rHSFXj2Gm_ERsraQ',
  },
  {
    id: 'bs-2',
    name: 'Truffle Margherita Pizza',
    price: 18.5,
    description: 'Wood-fired sourdough crust, Italian San Marzano tomatoes, buffalo mozzarella & basil.',
    category: 'Pizza',
    popularTag: 'Best Seller',
    restaurantId: 'trattoria-bella',
    restaurantName: 'Trattoria Bella Napoli',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAvOEVS8V-eyD9Wl4Kie57C4p9cWoTQFJvWAm_I5zC4T-dxMaXjPj0ir-gAt4HuoD-kb6p1HoGQNocKlRyvGtK0mgBselQ-mUHNrSh8ULx76DX54jRsKaDvO5GEl54weUZJNg2Mt5IgIJ7B74_YU0aPu57-R3XijyMJ22ZYAnE3Mcu-UCqQMX6_jx-6g0sR98OXn-mWw46mefQeDMec8QByRnFVJ4IBLj7odkSJGO9aFf-UGMTRQd61Cw',
  },
  {
    id: 'bs-3',
    name: 'Hyderabadi Dum Biryani',
    price: 16.0,
    description: 'Royal aromatic chicken biryani served with spicy salan and refreshing mint raita.',
    category: 'Biryani',
    popularTag: 'Chef Special',
    restaurantId: 'taj-spice',
    restaurantName: 'Taj Spice & Biryani',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCG5AnxKuW5Aunat5OgMU5UNB60iel9pcYpQrgsLig5ezxgV_McZONjtrDukFkCUbFHPwVYRfseZ7VLe0s-ykeiGp7JYowXanESldF5Qscvw--Pd6aTolikfcW2c4yG44pYKaykjKElmouJApVSE-AZL8wIxTq6Agv0QgFUieB_XQdRovMQufV-33bu0EFYXZqeNQ-rer3KTRd0RuLtGlaWAxJ2nxarzQb7xKS_fqdqNlwFOlvCzcemQQ',
  },
  {
    id: 'bs-4',
    name: 'Molten Lava Cake',
    price: 8.99,
    description: 'Decadent dark chocolate molten cake with warm liquid center dusted with organic sugar.',
    category: 'Desserts',
    popularTag: 'Popular',
    restaurantId: 'sweet-paris',
    restaurantName: 'Sweet Paris Bakery',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtkmbLRFytK1jUNqvdpesBKOeBlxvhwJ1OB0VMCWim59eH6sASoZeT7luqAGFjoN3glH3w8oLafYynKbv8UFc_za8FTwWHwc1Tbzjd8tQfKCnDoz3ur6uAiwfmhFcANNta4FYpxSRwmpMCaTFn83g-8DGmr7Q8ywSPV5STZRZAW6MAoOhyyQ7eQhF1YL-6lkWNj9U0zWoKiwf7XobZtTk9slOKqxpzVS8R_HBStTgWyVOJrBUEyloXQA',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    location: 'Manhattan, NY',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvLuy5rPXBkKJdb6vnnHQQE96yYuRtq7ioJOpDEZ6td7WERwXFy6t70D_j2vv4RyV_hzy0LTSbhmBBP5_A6FyaXC2LsdrN8sPeABOJnlEz3u3qKS774MtJLlGNcoz_3Z39XgHYsnNua7PmN1_C_6frTtsa2tt5MnV0_T1bplzkUFMRF40GASOEMZldJuNfklipM2vgi5QROg9K8NXuJGsrsAZD50Z7lEVLewBknwOcIhFkmtlN_hzDig',
    comment:
      '"CIBUSGO is an absolute game-changer! My order arrived in under 20 minutes and the food was still piping hot. The delivery tracker is super accurate."',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'David Miller',
    location: 'Brooklyn, NY',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3Ucr7QgiI2TR828zi36oge7PSnuopKSQVs5UZ4w495MP62QixCCs6frFrbSLm7A1Lxwv4Q7djlmUq0fWWsdnvrpTYX2Mnh0mWvt1nacQ11LQs2V8bo2l4qOWRFPRDVumLdY8G8HHvg2OLZMcYYJrMkcXuhUc-qTovmiZQa3ow9OL31UI-YQZl9G-4u9GmJl1zkaRqSIgMp6TfQzyqmT0EUNRdXyZ9ftyu4uImrEt6jlP6kdhGsxDFTA',
    comment:
      '"The restaurant selection is fantastic. I love discovering new local gems, and the promotional discounts make treating myself on weekends even better!"',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Emily Watson',
    location: 'Queens, NY',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBC-Ra4x_gZ0NHMwfNeGodhb6cnVCQ6xTFff0V7Spg5sEn_8WoJMq2-AR3URMrUWyd2Glw8TsEt1TgoXMjOq4JbnJ3U9Wjhimc2i8dlnjy1KeWvjXIqFhR8Ld5jpcnu0IFSMfn608uN5zQMaEvoWZGxs3cu1aFWwVEkcCGGPIJI96-ygJ_ZLIpTeqCOYRTv-ivx-wX17vWC5Q2VU-fcLyQwqJbifwVDD8R44ddHoPcsOil0jrcbiTAg0g',
    comment:
      '"Incredible customer service and seamless app interface. Had a minor issue with an address change and support resolved it instantly. 10/10!"',
    rating: 5,
  },
];

export const COUPONS: Coupon[] = [
  {
    code: 'WELCOME50',
    discountType: 'flat',
    discountValue: 10.0,
    description: '$10 off on your order',
    minSpend: 25.0,
    expiresIn: '7 days',
    tag: 'New User Special',
  },
  {
    code: 'BOGOFEAST',
    discountType: 'free_delivery',
    discountValue: 0,
    description: 'Free delivery on your order',
    minSpend: 15.0,
    expiresIn: '3 days',
    tag: 'Weekend Feast',
  },
  {
    code: 'PIZZA30',
    discountType: 'percentage',
    discountValue: 30,
    description: '30% OFF on all artisanal pizzerias',
    minSpend: 30.0,
    expiresIn: '2 days',
    tag: 'Midweek Special',
  },
  {
    code: 'ZERODEL',
    discountType: 'free_delivery',
    discountValue: 0,
    description: 'Zero delivery fee on all partners',
    minSpend: 15.0,
    expiresIn: 'Today',
    tag: 'Free Delivery',
  },
  {
    code: 'ASIAN15',
    discountType: 'flat',
    discountValue: 15.0,
    description: '$15 OFF on sushi, ramen & Asian dishes',
    minSpend: 45.0,
    expiresIn: '5 days',
    tag: 'Asian Craze',
  },
  {
    code: 'GOURMET15',
    discountType: 'flat',
    discountValue: 12.0,
    description: '$12 OFF Gourmet Artisan Selection',
    minSpend: 30.0,
    expiresIn: '10 days',
    tag: 'Gourmet Club',
  },
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Home',
    fullAddress: '422 West 23rd St, Apt 4B, New York, NY 10011',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Work',
    fullAddress: '100 Tech Plaza, Floor 14, New York, NY 10001',
    isDefault: false,
  },
];

export const INITIAL_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'card',
    title: 'Credit / Debit Card',
    subtitle: 'Visa ending in 4821',
    isDefault: true,
  },
  {
    id: 'pm-2',
    type: 'apple_pay',
    title: 'Apple / Google Pay',
    subtitle: 'anna.m@icloud.com',
    isDefault: false,
  },
  {
    id: 'pm-3',
    type: 'cod',
    title: 'Cash on Delivery',
    subtitle: 'Pay when food arrives',
    isDefault: false,
  },
];

export const INITIAL_CART_ITEMS = [
  {
    menuItem: BURGER_CO_MENU[0], // Truffle Bacon Burger
    quantity: 2,
    notes: 'Extra crispy bacon, sauce on the side',
  },
  {
    menuItem: BURGER_CO_MENU[4], // Truffle Parmesan Fries
    quantity: 1,
    notes: '',
  },
  {
    menuItem: BURGER_CO_MENU[6], // Artisanal Craft Soda
    quantity: 2,
    notes: 'Blood Orange & Vanilla Bean',
  },
];

export const INITIAL_ACTIVE_ORDER: Order = {
  id: 'FG-8839',
  restaurantName: 'Burger & Co. Artisan',
  restaurantId: 'burger-co',
  status: 'Out for Delivery',
  placedAt: '12:10 PM',
  estimatedDelivery: '12:45 PM',
  items: INITIAL_CART_ITEMS,
  subtotal: 43.5,
  deliveryFee: 3.99,
  taxes: 2.5,
  discount: 12.0,
  couponCode: 'GOURMET15',
  tip: 3.0,
  total: 39.24,
  courierName: 'Michael Rodriguez',
  courierRating: 4.9,
  courierPhone: '+1 (555) 392-8172',
  courierVehicle: 'Electric Scooter (Plate: NY-9923)',
};

export const PAST_ORDERS: Order[] = [
  {
    id: 'FG-8839',
    restaurantName: 'Burger Joint & Co.',
    restaurantId: 'burger-co',
    status: 'Delivered',
    placedAt: 'Oct 24, 2024 at 7:15 PM',
    estimatedDelivery: 'Delivered',
    items: [
      {
        menuItem: BURGER_CO_MENU[1],
        quantity: 2,
      },
      {
        menuItem: BURGER_CO_MENU[4],
        quantity: 1,
      },
      {
        menuItem: BURGER_CO_MENU[6],
        quantity: 1,
      },
    ],
    subtotal: 38.5,
    deliveryFee: 0,
    taxes: 3.74,
    discount: 5.0,
    tip: 2.0,
    total: 39.24,
  },
  {
    id: 'FG-8712',
    restaurantName: 'Sakura Sushi Master',
    restaurantId: 'sakura-sushi',
    status: 'Delivered',
    placedAt: 'Oct 18, 2024 at 1:30 PM',
    estimatedDelivery: 'Delivered',
    items: [
      {
        menuItem: {
          id: 'sk-1',
          name: 'Dragon Roll & Spicy Tuna',
          price: 24.0,
          description: '',
          category: 'Sushi',
          image: '',
          restaurantId: 'sakura-sushi',
          restaurantName: 'Sakura Sushi Master',
        },
        quantity: 2,
      },
      {
        menuItem: {
          id: 'sk-2',
          name: 'Miso Soup & Green Tea Mochi',
          price: 6.8,
          description: '',
          category: 'Sides',
          image: '',
          restaurantId: 'sakura-sushi',
          restaurantName: 'Sakura Sushi Master',
        },
        quantity: 1,
      },
    ],
    subtotal: 54.8,
    deliveryFee: 0,
    taxes: 5.0,
    discount: 5.0,
    tip: 0,
    total: 54.8,
  },
];
