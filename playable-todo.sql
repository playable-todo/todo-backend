PGDMP      /                |            playable-todo    16.1    16.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    25150    playable-todo    DATABASE     �   CREATE DATABASE "playable-todo" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "playable-todo";
                postgres    false            �            1259    25190    todo    TABLE     �   CREATE TABLE public.todo (
    todo_id bigint NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    user_id bigint NOT NULL,
    tag_id bigint,
    is_make boolean DEFAULT false NOT NULL,
    image json,
    attachment json
);
    DROP TABLE public.todo;
       public         heap    postgres    false            �            1259    25212 	   todo_tags    TABLE     N   CREATE TABLE public.todo_tags (
    tag_id bigint NOT NULL,
    title text
);
    DROP TABLE public.todo_tags;
       public         heap    postgres    false            �            1259    25232    todo_tags_tag_id_seq    SEQUENCE     �   ALTER TABLE public.todo_tags ALTER COLUMN tag_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.todo_tags_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    25231    todo_todo_id_seq    SEQUENCE     �   ALTER TABLE public.todo ALTER COLUMN todo_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.todo_todo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    25152    users    TABLE     �   CREATE TABLE public.users (
    id bigint NOT NULL,
    fullname text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    25151    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �          0    25190    todo 
   TABLE DATA           d   COPY public.todo (todo_id, title, content, user_id, tag_id, is_make, image, attachment) FROM stdin;
    public          postgres    false    217   >       �          0    25212 	   todo_tags 
   TABLE DATA           2   COPY public.todo_tags (tag_id, title) FROM stdin;
    public          postgres    false    218   �       �          0    25152    users 
   TABLE DATA           >   COPY public.users (id, fullname, email, password) FROM stdin;
    public          postgres    false    216   �       �           0    0    todo_tags_tag_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.todo_tags_tag_id_seq', 3, true);
          public          postgres    false    220                        0    0    todo_todo_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.todo_todo_id_seq', 50, true);
          public          postgres    false    219                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 8, true);
          public          postgres    false    215            _           2606    25196    todo todo_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (todo_id);
 8   ALTER TABLE ONLY public.todo DROP CONSTRAINT todo_pkey;
       public            postgres    false    217            a           2606    25216    todo_tags todo_tags_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.todo_tags
    ADD CONSTRAINT todo_tags_pkey PRIMARY KEY (tag_id);
 B   ALTER TABLE ONLY public.todo_tags DROP CONSTRAINT todo_tags_pkey;
       public            postgres    false    218            \           2606    25158    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            ]           1259    25203    fki_user    INDEX     <   CREATE INDEX fki_user ON public.todo USING btree (user_id);
    DROP INDEX public.fki_user;
       public            postgres    false    217            b           2606    25225    todo tag    FK CONSTRAINT     �   ALTER TABLE ONLY public.todo
    ADD CONSTRAINT tag FOREIGN KEY (tag_id) REFERENCES public.todo_tags(tag_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 2   ALTER TABLE ONLY public.todo DROP CONSTRAINT tag;
       public          postgres    false    4705    218    217            c           2606    25198 	   todo user    FK CONSTRAINT     �   ALTER TABLE ONLY public.todo
    ADD CONSTRAINT "user" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 5   ALTER TABLE ONLY public.todo DROP CONSTRAINT "user";
       public          postgres    false    216    217    4700            �   o  x�͓�N�0�g�)��%)mJ�		!&*�0v�Ɨ����8B)�k���x���pT	2�U@ً�矾�ϗ\���~+P��h��;r�WN�3���<�]�s�(rƴ����ZW�����׫ɐ<Z��5�$H$�i�*V���!�5���øt�x�\`K���?Yp5����BQ�e<Ʃ��X�w��
��ۆ�6�Ȱ<�
$z�	��rv�6�B���%>զ��1�k�*n.7ArAX%A��8�2m�~B�d~�9+��m:�ݶ�F'��%3��B:2���K+r��c�V�\B�q�������U��甤��%ٿ{���iaAJO�}��O�a�z~�d�33O���?&�4!�ϣ >����      �   0   x�3�L,8�1'191;'��ˈ���ܜL.cN�Ģ���=... +�$      �     x�e�I��@�5��E��qאB[���T�!AdJ��V����Fժ��x�/���c�q�a>�U��߈�x~qQ�ŭ�ï����Jښxc�7�~ۊ©A��؜׉�¼�;��(	�����}t֪fxGS�f3�$IaI��˘����&~K_��E��.f�>������T�O�s:��	�A,�Gq���Я
���ͷO���y ڄ/�M�D��;��M� 8��� ��4��������O�Cr?fT�xi�S�����u����\r�,uR�\������.���y{t���$O����Wf�|���H�F����j_eJ�|Ɩ�K3cN�)*��n���� )Y�,|I�oi��t�ҝ?ؖ����ECg��wL�`[�ݰ>��]֔!��TH�xU�Ĉ�P��5�$	q�a�ޛx� 3ư����3	Oǜ¹@�U6���I�p�GqWz�m�	�P�w�\��.��k�d������:��b���냞|���6���8���p c�)�$�,��     