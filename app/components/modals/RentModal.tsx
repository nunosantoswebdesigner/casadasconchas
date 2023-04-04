'use client';

import axios from 'axios';
import dynamic from 'next/dynamic'
import useRentModal from '@/app/hooks/useRentModal';
import Modal from "./Modal";
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from "../inputs/CountrySelect";
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";
import { categories } from '../navbar/Categories';

enum STEPS { DESCRIPTION = 0, CATEGORY = 1, LOCATION = 2, IMAGE = 3, INFO = 4 }

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      imageSrc: '',
      imageSrcQRcode: null,
      title: '',
      description: '',
    }
  });

  const location = watch('location');
  const category = watch('category');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    
    setIsLoading(true);

    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Concha criada com Sucesso!');
      router.refresh();
      reset();
      setStep(STEPS.DESCRIPTION)
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Alguma coisa correu mal!');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) { return 'Criar Concha' }
    return 'Próximo'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    
    // DESCRIPTION
    if (step === STEPS.DESCRIPTION) { return undefined } return 'Retroceder' }, [step]);
    let bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Nome e Descrição" subtitle="Lorem ipsum dolor emet fur" />
        <Input id="title" label="Nome" disabled={isLoading} register={register} errors={errors} required />
        <hr />
        <Input id="description" label="Descrição" disabled={isLoading} register={register} errors={errors} required />
      </div>
    )
    
    // CATEGORY
    if (step === STEPS.CATEGORY) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Qual a categoria da Concha?" subtitle="Lista de categorias" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      )
    }

    // LOCATION
    if (step === STEPS.LOCATION) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Localização?" subtitle="Escreve a localização desta Concha."/>
          <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
          <Map center={location?.latlng} />
        </div>
      );
    };
    
    // IMAGE
    if (step === STEPS.IMAGE) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Imagem" subtitle="Adiciona uma imagem à nova Concha." />
          <ImageUpload onChange={(value) => setCustomValue('imageSrc', value)} value={imageSrc} />
        </div>
      )
    }

    // INFO
    if (step === STEPS.INFO) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Deseja Gravar?" subtitle="Obrigado por criar esta nova entrada."/>
          Info Tags here
        </div>
      )
    }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Adicionar nova Concha à coleção!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.DESCRIPTION ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}

export default RentModal;
