import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { exerciseOptions, youtubeOptions, fetchData } from '../utils/fetchData';
import { Detail, ExerciseVideos, SimilarExercises } from '../components';


const ExerciseDetail = () => {
    const [exerciseDetail, setExerciseDetail] = useState({});
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const [targetExercises, setTargetExercises] = useState([]);
    const [equipmentExercises, setEquipmentExercises] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    
        const fetchExercisesData = async () => {
          const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
          const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

          exerciseOptions.url = `${exerciseDbUrl}/exercises/exercise/${id}`;
          
          const exerciseDetailData = await fetchData(exerciseOptions);
          setExerciseDetail(exerciseDetailData);
          
          youtubeOptions.url  = `${youtubeSearchUrl}/search?query=${(await exerciseDetailData).name} exercise`;

          const exerciseVideosData = await fetchData(youtubeOptions);
          setExerciseVideos(exerciseVideosData.contents);

          exerciseOptions.url = `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`;
          const targetMuscleExercisesData = await fetchData(exerciseOptions);
          setTargetExercises(targetMuscleExercisesData);

          exerciseOptions.url = `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`;
          const equipmentExercisesData = await fetchData(exerciseOptions);
          setEquipmentExercises(equipmentExercisesData);
        }
        fetchExercisesData();
      }, [id]);

    return (
        <Box>
            <Detail exerciseDetail={exerciseDetail} />
            <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
            <SimilarExercises targetExercises={targetExercises} equipmentExercises={equipmentExercises}/>
        </Box>
    )
}

export default ExerciseDetail