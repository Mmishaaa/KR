import { Box, Container, Grid, Typography } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import GenericPage from "./GenericPage";
import { FC, useState } from "react";
import ProfileCard from "../components/profile/profileCard";
import { Gender } from "../shared/enums/gender";

const users = [
  {
    id: "1",
    fusionUserId: "fusion-456",
    firstName: "John",
    lastName: "Doe",
    age: 30,
    city: "New York",
    description: "Software developer",
    gender: Gender.Man,
    email: "john.doe@example.com",
    photos: [
      {
        id: "photo-789",
        isAvatar: false,
        photoURL: "https://randomuser.me/api/portraits/men/3.jpg",
        userId: "1"
      },
      {
        id: "photo-790",
        isAvatar: false,
        photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
        userId: "1"
      },
      {
        id: "photo-791",
        isAvatar: true,
        photoURL: "https://randomuser.me/api/portraits/men/4.jpg",
        userId: "1"
      }
    ]
  },
  {
    id: "2",
    fusionUserId: "fusion-789",
    firstName: "Jane",
    lastName: "Smith",
    age: 28,
    city: "Los Angeles",
    description: "Graphic designer",
    gender: Gender.Woman,
    email: "jane.smith@example.com",
    photos: [
      {
        id: "photo-792",
        isAvatar: true,
        photoURL: "https://randomuser.me/api/portraits/women/5.jpg",
        userId: "2"
      },
      {
        id: "photo-793",
        isAvatar: false,
        photoURL: "https://randomuser.me/api/portraits/women/12.jpg",
        userId: "2"
      }
    ]
  },
  {
    id: "3",
    fusionUserId: "fusion-321",
    firstName: "Mike",
    lastName: "Johnson",
    age: 35,
    city: "Chicago",
    description: "Marketing manager",
    gender: Gender.Man,
    email: "mike.johnson@example.com",
    photos: [
      {
        id: "photo-794",
        isAvatar: true,
        photoURL: "https://randomuser.me/api/portraits/men/7.jpg",
        userId: "3"
      },
      {
        id: "photo-795",
        isAvatar: false,
        photoURL: "https://randomuser.me/api/portraits/men/8.jpg",
        userId: "3"
      },
      {
        id: "photo-796",
        isAvatar: false,
        photoURL: "https://randomuser.me/api/portraits/men/9.jpg",
        userId: "3"
      }
    ]
  },
  {
    id: "4",
    fusionUserId: "fusion-654",
    firstName: "Emily",
    lastName: "Davis",
    age: 26,
    city: "San Francisco",
    description: "UI/UX designer",
    gender: Gender.Woman,
    email: "emily.davis@example.com",
    photos: [
      {
        id: "photo-797",
        isAvatar: true,
        photoURL: "https://randomuser.me/api/portraits/women/3.jpg",
        userId: "4"
      },
      {
        id: "photo-798",
        isAvatar: false,
        photoURL: "https://randomuser.me/api/portraits/women/6.jpg",
        userId: "4"
      }
    ]
  },
  {
    id: "5",
    fusionUserId: "fusion-987",
    firstName: "Robert",
    lastName: "Brown",
    age: 40,
    city: "Houston",
    description: "Project manager",
    gender: Gender.Man,
    email: "robert.brown@example.com",
    photos: [
      {
        id: "photo-799",
        isAvatar: true,
        photoURL: "https://randomuser.me/api/portraits/men/1.jpg",
        userId: "5"
      }
    ]
  },
  {
    id: "5",
    fusionUserId: "fusion-987",
    firstName: "Ryan",
    lastName: "Gosling",
    age: 40,
    city: "Houston",
    description: "Project manager",
    gender: Gender.Man,
    email: "robert.brown@example.com",
    photos: []
  }
];

const HitOrMissPage: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextProfile = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <GenericPage title="Hit or Miss" icons={[<TuneIcon />]}>
       <Container maxWidth="sm" sx={{ margin:"32px 0",
            '@media (min-width:600px)': {
            padding: 0
        }}}>
          <Box sx={{ backgroundColor: '#fff', padding: 2, borderRadius: "24px", boxShadow: 3 }}>
            <ProfileCard user={users[currentIndex]} onNextProfile={showNextProfile} /> 
          </Box>
      </Container>
    </GenericPage>
  );
};


export default HitOrMissPage;
