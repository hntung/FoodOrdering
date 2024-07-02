import { supabase } from '../../lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useProductList = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
          const {data ,error} = await supabase.from('products').select('*');
          if(error) {
            throw new Error(error.message);
          }
          return data;
        }
      });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const {data ,error} = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if(error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

export const useInsertProduct = () => {
  const  queryClient = useQueryClient();
  return useMutation({
    async mutationFn (data: any) {
      const { error, data: newProduct } = await supabase.from('products').insert({
        name: data.name,
        image: data.image,
        price: data.price,
      })
      .single();

      if(error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  })
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
      async mutationFn(data: any) {
          const { data: udpatedProduct, error } = await supabase.from('products').update({
              name: data.name,
              image: data.image,
              price: data.price
          })
              .eq('id', data.id)
              .single();

          if (error) {
              throw new Error(error.message);
          }
          return udpatedProduct;
      },
      async onSuccess(_, { id }) {
          await queryClient.invalidateQueries({ queryKey: ['products'] });
          await queryClient.invalidateQueries({ queryKey: ['products', id] });
      },
  })
}