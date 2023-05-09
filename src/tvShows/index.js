import express from 'express';
import { tvShows, tvShowReviews, tvShowDetails, tvShowImages } from './tvShowsData';
import uniqid from 'uniqid'

const router = express.Router();
router.get('/', (req, res) => {
    res.json(tvShows);
});

// Get tv show details
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (tvShowDetails.id == id) {
        res.status(200).json(tvShowDetails);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

// Get tv show reviews
router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (tvShowReviews.id == id) {
        res.status(200).json(tvShowReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

// Get tv show images
router.get('/:id/images', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (tvShowImages.id == id) {
        res.status(200).json(tvShowImages);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

//Post a tv show review
router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);

    if (tvShowReviews.id == id) {
        console.log("Created " + req.body);
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        tvShowReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

export default router;
