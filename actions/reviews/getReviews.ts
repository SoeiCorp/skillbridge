import { prisma } from "../../lib/prisma";
import getProfileImage from "../profile/getProfileImage";

const getReviews = async () => {
  const results = await prisma.review.findMany({
    include: {
      job: {
        include: {
          employer: {
            include: {
              user: true, // Populate user from userId in employer
            },
          },
          jobTag: true,
        },
      },
    },
  });

  const res: any = [];
  results.map((result) => {
    res.push({
      id: result.id,
      userId: result.job.employer.user.id,
      profileImage: result.job.employer.user.profileImageUrl,
      name:
        result.job.employer.user.salutation +
        result.job.employer.user.firstname +
        " " +
        result.job.employer.user.lastname,
      position: result.job.employer.position,
      organization: result.job.employer.organization,
      jobTag: result.job.jobTag.title,
      description: result.description.replace(/\n/g, ""),
    });
  });
  return res;
};

const getReviewsByStudentId = async (studentId: string) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        studentId: studentId,
      },
    });

    return reviews;
  } catch (err) {
    console.log("Error fetching reviews");
    return [];
  }
};

export { getReviews, getReviewsByStudentId };

// const main = async () => {
//   const result = await getReviews();
//   console.log(result);
// };

// main();
