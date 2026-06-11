# AI-Powered Tablet Visual Inspection System for Pharmaceutical Manufacturing

## Project Overview

The **AI-Powered Tablet Visual Inspection System** is an intelligent quality inspection solution designed to automate the detection and classification of defects in pharmaceutical tablets. Traditional manual inspection methods are often slow, inconsistent, and prone to human error, especially in high-speed production environments. This project leverages **Computer Vision** and **Deep Learning** to improve inspection accuracy, reduce operational costs, and enhance product quality.

The system analyzes tablet images, identifies defects in real time, and provides detailed insights through an interactive dashboard for quality monitoring and decision-making.

---

## Problem Statement

Pharmaceutical manufacturing requires strict quality control to ensure that only defect-free tablets reach consumers. Manual inspection presents several challenges:

* Slow inspection process
* Human fatigue and inconsistency
* Difficulty handling high-volume production lines
* Missed detection of small defects
* Increased rework and rejection costs
* Potential risk of defective products reaching customers

To address these issues, an automated AI-based inspection system was developed.

---

## Objectives

The primary objectives of this project are:

* Automatically detect tablet defects
* Classify multiple defect categories
* Enable real-time defect inspection
* Reduce dependence on manual inspection
* Improve manufacturing quality control
* Support GMP-compliant pharmaceutical production

---

## Defect Categories

The system is trained to identify the following defect types:

### 1. Surface Scratch

Physical scratches appearing on the tablet surface.

### 2. Faulty Print

Missing, faded, distorted, or improperly printed markings.

### 3. Edge Defect

Broken or chipped tablet edges.

### 4. Discoloration

Unexpected color variations caused by manufacturing issues.

### 5. Coating Irregularity

Uneven or incomplete coating on tablet surfaces.

### 6. Good Tablet

Defect-free tablets meeting quality standards.

---

## System Workflow

The project follows the following workflow:

1. Image Collection
2. Annotation of Defect Regions
3. Dataset Preparation
4. Data Augmentation
5. Model Training
6. Model Validation
7. Real-Time Inference
8. Result Logging
9. Dashboard Visualization

---

## Technology Stack

| Component               | Technology       |
| ----------------------- | ---------------- |
| Programming Language    | Python           |
| Annotation Tool         | Roboflow         |
| Detection Models        | YOLOv11, RF-DETR |
| Deep Learning Framework | PyTorch          |
| Image Processing        | OpenCV           |
| Data Visualization      | Power BI         |
| Deployment              | Edge AI          |

---

## Dataset Preparation

The dataset preparation process includes:

* Collection of tablet images
* Bounding box annotation
* Training, validation, and testing split
* Data augmentation
* Label verification

### Augmentation Techniques

* Rotation
* Horizontal/Vertical Flipping
* Brightness Adjustment
* Blur Enhancement

These techniques increase dataset diversity and improve model robustness.

---

## Model Training

The training pipeline consists of:

### Data Preprocessing

Preparing images and labels for training.

### Hyperparameter Tuning

Optimizing learning parameters for better performance.

### Epoch-wise Optimization

Improving model accuracy over multiple training cycles.

### Validation Monitoring

Tracking model performance during training.

### Weight Export

Saving trained model weights for deployment.

### Training Goals

* Higher Mean Average Precision (mAP)
* Improved Recall
* Reduced False Positives
* Better Localization Accuracy

---

## Detection Models

### YOLOv11

YOLOv11 was selected because of:

* Fast inference speed
* Low latency
* Lightweight architecture
* Efficient CPU execution
* Edge deployment suitability

**Best suited for:** High-speed industrial inspection.

### RF-DETR

RF-DETR was selected because of:

* Transformer-based architecture
* Better feature extraction
* Improved localization accuracy
* Superior fine-defect detection
* Higher precision and recall

**Best suited for:** Precision pharmaceutical inspection.

---

## Model Comparison

| Parameter    | YOLOv11 | RF-DETR     |
| ------------ | ------- | ----------- |
| Architecture | CNN     | Transformer |
| Speed        | High    | Moderate    |
| Accuracy     | Medium  | High        |
| Precision    | 85%     | 92%         |
| Recall       | 68%     | 88%         |

This comparison helps balance inspection speed and detection accuracy depending on deployment requirements.

---

## Real-Time Inference Pipeline

The deployed system performs the following operations:

1. Load Input Image
2. Run Model Inference
3. Detect Defect Regions
4. Generate Bounding Boxes
5. Calculate Confidence Scores
6. Store Prediction Results

### Generated Outputs

* Defect Classification
* Bounding Box Coordinates
* Confidence Scores
* Detection Metadata

---

## Dashboard and Analytics

Power BI dashboards are used to:

* Monitor defect occurrences
* Analyze defect distribution
* Track inspection performance
* Visualize production quality trends
* Support data-driven manufacturing decisions

---

## Industrial Benefits

The proposed system offers several advantages:

* Reduced manual workload
* Faster inspection speed
* Improved quality consistency
* Lower rejection and rework costs
* Increased production efficiency
* Scalable inspection framework

---

## GMP Compliance Benefits

The system supports pharmaceutical quality standards by providing:

* Consistent inspection procedures
* Automated quality validation
* Reduced human error
* Traceable inspection records
* Improved audit readiness

---

## Future Enhancements

Potential future developments include:

* Conveyor belt integration
* Live camera inspection
* Jetson Nano deployment
* Automated defect rejection mechanism
* Cloud-based dashboards
* Multi-camera inspection systems

---

## Conclusion

The project successfully demonstrates the application of Artificial Intelligence in pharmaceutical manufacturing. By combining deep learning-based defect detection with real-time analytics, the system provides a scalable and reliable solution for automated tablet inspection.

The results indicate that AI-driven quality control can significantly improve manufacturing efficiency, reduce inspection errors, and support regulatory compliance while enabling the adoption of Industry 4.0 practices in pharmaceutical production.

---

## Team Members

* Sowmya
* Lalitha Saranya
* Deepak Reddy
* Naga Sriyasantoshi

**Final Presentation – L&T EduTech**
**June 2026**
