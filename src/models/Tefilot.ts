export type Tefila = {
  tefila_name: string
  schedule: string
}

export type Tefilot = {
  id: string
  name: string
  created_at: string
  tefilot: Tefila[]
}

export type AllTefilot = Tefilot[]

// {
//     "id": "123456è_",
//     "name": "Chol",
//     "created_at": "Sun, 18 Jun 2023 11:40:09 GMT",
//     "tefilot": [
//       {
//         "tefila_name": "shacharit",
//         "schedule": "Alos96Zmanis, 3, round-down"
//       }
//     ]
//   }
