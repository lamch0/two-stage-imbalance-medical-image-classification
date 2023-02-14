#!/usr/bin/env bash

# EYEPACS EXPERIMENTS
# Eyepacs training in different methods 
python train_lt_mxp.py --save_path eyepacs/mxp_1e-1/mobilenet --model_name mobilenetV2  --do_mixup  0.1 --n_epochs 30 --metric kappa
python train_lt_mxp.py --save_path eyepacs/mxp_1e-2/mobilenet --model_name mobilenetV2  --do_mixup  0.2 --n_epochs 30 --metric kappa
python train_lt_mxp.py --save_path eyepacs/mxp_1e-3/mobilenet --model_name mobilenetV2  --do_mixup  0.3 --n_epochs 30 --metric kappa
python train_lt.py --save_path eyepacs/sqrt/mobilenet         --model_name mobilenetV2 --sampling sqrt --n_epochs 30 --metric kappa
python train_lt.py --save_path eyepacs/class/mobilenet        --model_name mobilenetV2 --sampling class --n_epochs 30 --metric kappa
python train_lt.py --save_path eyepacs/instance/mobilenet     --model_name mobilenetV2 --sampling instance --n_epochs 30 --metric kappa
python train_lt.py --save_path eyepacs/BSCE/mobilenet     --model_name mobilenetV2 --weighting BSCE --n_epochs 30 --metric kappa
python train_lt.py --save_path eyepacs/CDT/mobilenet     --model_name mobilenetV2 --weighting CDT --n_epochs 30 --metric kappa

# Eyepacs second stage training in different methods (first stage use instance sampling only)
python train_lt.py --save_path eyepacs/2stage/mobilenet/sqrt  --model_name mobilenetV2 --sampling sqrt  --n_epochs 60 --lr 0.003 --metric kappa --pretrained_weights experiments/eyepacs/instance/mobilenet/`best epoch`
python train_lt.py --save_path eyepacs/2stage/mobilenet/class  --model_name mobilenetV2 --sampling calss  --n_epochs 60 --lr 0.003 --metric kappa --pretrained_weights experiments/eyepacs/instance/mobilenet/`best epoch`
python train_lt.py --save_path eyepacs/2stage/mobilenet/instance  --model_name mobilenetV2 --sampling instance  --n_epochs 60 --lr 0.003 --metric kappa --pretrained_weights experiments/eyepacs/instance/mobilenet/`best epoch`
python train_lt.py --save_path eyepacs/2stage/mobilenet/BSCE  --model_name mobilenetV2 --weighting BSCE  --n_epochs 60 --lr 0.003 --metric kappa --pretrained_weights experiments/eyepacs/instance/mobilenet/`best epoch`
python train_lt.py --save_path eyepacs/2stage/mobilenet/CDT  --model_name mobilenetV2 --weighting CDT  --n_epochs 60 --lr 0.003 --metric kappa --pretrained_weights experiments/eyepacs/instance/mobilenet/`best epoch`
python train_lt.py --save_path eyepacs/2stage/mobilenet/mxp_1e-3  --model_name mobilenetV2 --do_mixup  0.3 --n_epochs 60 --lr 0.003 --metric kappa --pretrained_weights experiments/eyepacs/instance/mobilenet/`best epoch`

# ENDOSCOPY EXPERIMENTS
# Endoscopy training in different methods of F1
python train_lt_mxp.py --save_path endo/F1/mxp_1e-1/mobilenetV2 --csv_train data/train_endo1.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.1    --n_epochs 30 --metric mcc --n_classes 23
python train_lt_mxp.py --save_path endo/F1/mxp_2e-1/mobilenetV2 --csv_train data/train_endo1.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.2    --n_epochs 30 --metric mcc --n_classes 23
python train_lt_mxp.py --save_path endo/F1/mxp_3e-1/mobilenetV2 --csv_train data/train_endo1.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.3    --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F1/sqrt/mobilenetV2  --csv_train data/train_endo1.csv --data_path data/images        --model_name mobilenetV2 --sampling sqrt     --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F1/class/mobilenetV2  --csv_train data/train_endo1.csv --data_path data/images       --model_name mobilenetV2 --sampling class    --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F1/instance/mobilenetV2  --csv_train data/train_endo1.csv --data_path data/images    --model_name mobilenetV2 --sampling instance --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F1/BCSE/mobilenetV2  --csv_train data/train_endo1.csv --data_path data/images        --model_name mobilenetV2 --weighting BCSE    --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F1/CDT/mobilenetV2  --csv_train data/train_endo1.csv --data_path data/images         --model_name mobilenetV2 --weighting CDT     --n_epochs 30 --metric mcc --n_classes 23

# Endoscopy second stage training in different methods of F1(first stage use instance sampling only)
python train_lt.py --save_path endo/F1/2stage/mobilenetV2/sqrt  --csv_train data/train_endo1.csv --data_path data/images --model_name mobilenetV2 --sampling sqrt     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003 --pretrained_weights experiments/endo/F1/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F1/2stage/mobilenetV2/class  --csv_train data/train_endo1.csv --data_path data/images --model_name mobilenetV2 --sampling class     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003 --pretrained_weights experiments/endo/F1/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F1/2stage/mobilenetV2/instance  --csv_train data/train_endo1.csv --data_path data/images --model_name mobilenetV2 --sampling instance     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003 --pretrained_weights experiments/endo/F1/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F1/2stage/mobilenetV2/BSCE  --csv_train data/train_endo1.csv --data_path data/images --model_name mobilenetV2 --weighting BSCE     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003 --pretrained_weights experiments/endo/F1/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F1/2stage/mobilenetV2/CDT  --csv_train data/train_endo1.csv --data_path data/images --model_name mobilenetV2 --weighting CDT     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003 --pretrained_weights experiments/endo/F1/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F1/2stage/mobilenetV2/mxp_3e-1  --csv_train data/train_endo1.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.3  --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003 --pretrained_weights experiments/endo/F1/instance/mobilenetV2/`best epoch`

# Endoscopy training in different methods of F2
python train_lt_mxp.py --save_path endo/F2/mxp_1e-1/mobilenetV2 --csv_train data/train_endo2.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.1    --n_epochs 30 --metric mcc --n_classes 23
python train_lt_mxp.py --save_path endo/F2/mxp_2e-1/mobilenetV2 --csv_train data/train_endo2.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.2    --n_epochs 30 --metric mcc --n_classes 23
python train_lt_mxp.py --save_path endo/F2/mxp_3e-1/mobilenetV2 --csv_train data/train_endo2.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.3    --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F2/sqrt/mobilenetV2  --csv_train data/train_endo2.csv --data_path data/images        --model_name mobilenetV2 --sampling sqrt     --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F2/class/mobilenetV2  --csv_train data/train_endo2.csv --data_path data/images       --model_name mobilenetV2 --sampling class    --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F2/instance/mobilenetV2  --csv_train data/train_endo2.csv --data_path data/images    --model_name mobilenetV2 --sampling instance --n_epochs 30 --metric mcc --n_classes 23

# Endoscopy second stage training in different methods of F2(first stage use instance sampling only)
python train_lt.py --save_path endo/F2/2stage/mobilenetV2/sqrt      --csv_train data/train_endo2.csv --data_path data/images --model_name mobilenetV2 --sampling sqrt     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003     --pretrained_weights experiments/endo/F2/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F2/2stage/mobilenetV2/class     --csv_train data/train_endo2.csv --data_path data/images --model_name mobilenetV2 --sampling class     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003    --pretrained_weights experiments/endo/F2/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F2/2stage/mobilenetV2/instance  --csv_train data/train_endo2.csv --data_path data/images --model_name mobilenetV2 --sampling instance     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003 --pretrained_weights experiments/endo/F2/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F2/2stage/mobilenetV2/BSCE      --csv_train data/train_endo2.csv --data_path data/images --model_name mobilenetV2 --weighting BSCE     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003    --pretrained_weights experiments/endo/F2/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F2/2stage/mobilenetV2/CDT       --csv_train data/train_endo2.csv --data_path data/images --model_name mobilenetV2 --weighting CDT     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003     --pretrained_weights experiments/endo/F2/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F2/2stage/mobilenetV2/mxp_3e-1  --csv_train data/train_endo2.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.3  --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003       --pretrained_weights experiments/endo/F2/instance/mobilenetV2/`best epoch`

# Endoscopy training in different methods of F3
python train_lt_mxp.py --save_path endo/F3/mxp_1e-1/mobilenetV2 --csv_train data/train_endo3.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.1    --n_epochs 30 --metric mcc --n_classes 23
python train_lt_mxp.py --save_path endo/F3/mxp_2e-1/mobilenetV2 --csv_train data/train_endo3.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.2    --n_epochs 30 --metric mcc --n_classes 23
python train_lt_mxp.py --save_path endo/F3/mxp_3e-1/mobilenetV2 --csv_train data/train_endo3.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.3    --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F3/sqrt/mobilenetV2  --csv_train data/train_endo3.csv --data_path data/images        --model_name mobilenetV2 --sampling sqrt     --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F3/class/mobilenetV2  --csv_train data/train_endo3.csv --data_path data/images       --model_name mobilenetV2 --sampling class    --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F3/instance/mobilenetV2  --csv_train data/train_endo3.csv --data_path data/images    --model_name mobilenetV2 --sampling instance --n_epochs 30 --metric mcc --n_classes 23

# Endoscopy second stage training in different methods of F3(first stage use instance sampling only)
python train_lt.py --save_path endo/F3/2stage/mobilenetV2/sqrt      --csv_train data/train_endo3.csv --data_path data/images --model_name mobilenetV2 --sampling sqrt     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003     --pretrained_weights experiments/endo/F3/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F3/2stage/mobilenetV2/class     --csv_train data/train_endo3.csv --data_path data/images --model_name mobilenetV2 --sampling class     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003    --pretrained_weights experiments/endo/F3/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F3/2stage/mobilenetV2/instance  --csv_train data/train_endo3.csv --data_path data/images --model_name mobilenetV2 --sampling instance     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003 --pretrained_weights experiments/endo/F3/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F3/2stage/mobilenetV2/BSCE      --csv_train data/train_endo3.csv --data_path data/images --model_name mobilenetV2 --weighting BSCE     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003    --pretrained_weights experiments/endo/F3/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F3/2stage/mobilenetV2/CDT       --csv_train data/train_endo3.csv --data_path data/images --model_name mobilenetV2 --weighting CDT     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003     --pretrained_weights experiments/endo/F3/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F3/2stage/mobilenetV2/mxp_3e-1  --csv_train data/train_endo3.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.3  --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003       --pretrained_weights experiments/endo/F3/instance/mobilenetV2/`best epoch`


# Endoscopy training in different methods of F4
python train_lt_mxp.py --save_path endo/F4/mxp_1e-1/mobilenetV2 --csv_train data/train_endo4.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.1    --n_epochs 30 --metric mcc --n_classes 23
python train_lt_mxp.py --save_path endo/F4/mxp_2e-1/mobilenetV2 --csv_train data/train_endo4.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.2    --n_epochs 30 --metric mcc --n_classes 23
python train_lt_mxp.py --save_path endo/F4/mxp_3e-1/mobilenetV2 --csv_train data/train_endo4.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.3    --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F4/sqrt/mobilenetV2  --csv_train data/train_endo4.csv --data_path data/images        --model_name mobilenetV2 --sampling sqrt     --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F4/class/mobilenetV2  --csv_train data/train_endo4.csv --data_path data/images       --model_name mobilenetV2 --sampling class    --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F4/instance/mobilenetV2  --csv_train data/train_endo4.csv --data_path data/images    --model_name mobilenetV2 --sampling instance --n_epochs 30 --metric mcc --n_classes 23

# Endoscopy second stage training in different methods of F4(first stage use instance sampling only)
python train_lt.py --save_path endo/F4/2stage/mobilenetV2/sqrt      --csv_train data/train_endo4.csv --data_path data/images --model_name mobilenetV2 --sampling sqrt     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003     --pretrained_weights experiments/endo/F4/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F4/2stage/mobilenetV2/class     --csv_train data/train_endo4.csv --data_path data/images --model_name mobilenetV2 --sampling class     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003    --pretrained_weights experiments/endo/F4/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F4/2stage/mobilenetV2/instance  --csv_train data/train_endo4.csv --data_path data/images --model_name mobilenetV2 --sampling instance     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003 --pretrained_weights experiments/endo/F4/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F4/2stage/mobilenetV2/BSCE      --csv_train data/train_endo4.csv --data_path data/images --model_name mobilenetV2 --weighting BSCE     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003    --pretrained_weights experiments/endo/F4/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F4/2stage/mobilenetV2/CDT       --csv_train data/train_endo4.csv --data_path data/images --model_name mobilenetV2 --weighting CDT     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003     --pretrained_weights experiments/endo/F4/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F4/2stage/mobilenetV2/mxp_3e-1  --csv_train data/train_endo4.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.3  --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003       --pretrained_weights experiments/endo/F4/instance/mobilenetV2/`best epoch`


# Endoscopy training in different methods of F5
python train_lt_mxp.py --save_path endo/F5/mxp_1e-1/mobilenetV2 --csv_train data/train_endo5.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.1    --n_epochs 30 --metric mcc --n_classes 23
python train_lt_mxp.py --save_path endo/F5/mxp_2e-1/mobilenetV2 --csv_train data/train_endo5.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.2    --n_epochs 30 --metric mcc --n_classes 23
python train_lt_mxp.py --save_path endo/F5/mxp_3e-1/mobilenetV2 --csv_train data/train_endo5.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.3    --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F5/sqrt/mobilenetV2  --csv_train data/train_endo5.csv --data_path data/images        --model_name mobilenetV2 --sampling sqrt     --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F5/class/mobilenetV2  --csv_train data/train_endo5.csv --data_path data/images       --model_name mobilenetV2 --sampling class    --n_epochs 30 --metric mcc --n_classes 23
python train_lt.py --save_path endo/F5/instance/mobilenetV2  --csv_train data/train_endo5.csv --data_path data/images    --model_name mobilenetV2 --sampling instance --n_epochs 30 --metric mcc --n_classes 23

# Endoscopy second stage training in different methods of F5(first stage use instance sampling only)
python train_lt.py --save_path endo/F5/2stage/mobilenetV2/sqrt      --csv_train data/train_endo5.csv --data_path data/images --model_name mobilenetV2 --sampling sqrt     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003     --pretrained_weights experiments/endo/F5/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F5/2stage/mobilenetV2/class     --csv_train data/train_endo5.csv --data_path data/images --model_name mobilenetV2 --sampling class     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003    --pretrained_weights experiments/endo/F5/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F5/2stage/mobilenetV2/instance  --csv_train data/train_endo5.csv --data_path data/images --model_name mobilenetV2 --sampling instance     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003 --pretrained_weights experiments/endo/F5/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F5/2stage/mobilenetV2/BSCE      --csv_train data/train_endo5.csv --data_path data/images --model_name mobilenetV2 --weighting BSCE     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003    --pretrained_weights experiments/endo/F5/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F5/2stage/mobilenetV2/CDT       --csv_train data/train_endo5.csv --data_path data/images --model_name mobilenetV2 --weighting CDT     --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003     --pretrained_weights experiments/endo/F5/instance/mobilenetV2/`best epoch`
python train_lt.py --save_path endo/F5/2stage/mobilenetV2/mxp_3e-1  --csv_train data/train_endo5.csv --data_path data/images --model_name mobilenetV2  --do_mixup  0.3  --n_epochs 60 --metric mcc --n_classes 23 --lr 0.003       --pretrained_weights experiments/endo/F5/instance/mobilenetV2/`best epoch`
